import { PaginationsProps } from "@/types/props";
import { SearchResultsState } from "@/types/types";
import {
  ApolloClient,
  DocumentNode,
  HttpLink,
  InMemoryCache,
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  TypedDocumentNode,
  useQuery,
} from "@apollo/client";
import { NextApiRequest } from "next";

export const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL,
      credentials: "same-origin",
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  });
};

export const useApollo = () => {
  const apolloClient = createApolloClient();
  return apolloClient;
};
interface CustomQueryResult extends QueryResult {
  state?: SearchResultsState;
  pageInfo?: PaginationsProps;
}

const useApolloQuery = ({
  query,
  options,
  findOne = false,
}: {
  query: DocumentNode;
  options?: QueryHookOptions;
  findOne?: boolean;
}) => {
  const { data, error, loading, ...rest }: CustomQueryResult = useQuery(query, {
    ...options,
    fetchPolicy: "cache-and-network",
  });

  if (findOne) {
    return {
      data,
      loading,
      error,
      ...rest,
    };
  }

  const dataObject =
    (data &&
      (Object.values(data).filter((item: any) => item?.data)[0] as any)
        ?.data) ||
    [];

  const pageInfo =
    (data &&
      (Object.values(data).filter((item: any) => item?.pageInfo)[0] as any)
        ?.pageInfo) ||
    [];

  const state: SearchResultsState =
    data && !error
      ? { status: "success", results: dataObject, count: pageInfo.total }
      : error
      ? { status: "error", error: error.message }
      : { status: "loading" };

  return {
    data: dataObject,
    loading,
    error,
    state,
    pageInfo,
    ...rest,
  };
};

export const ssrRequest = async <T>(
  locale: string,
  req: NextApiRequest,
  query: DocumentNode | TypedDocumentNode<unknown, OperationVariables>,
  options?: OperationVariables
): Promise<{
  messages: unknown;
  data: T;
  ip: string | undefined;
  error?: any;
}> => {
  const messages = (await import(`../config/locale/${locale}.json`)).default;

  const forwarded: string | string[] | undefined =
    req.headers["x-forwarded-for"];

  const ip =
    typeof forwarded === "string"
      ? forwarded.split(/, /)[0]
      : req.socket.remoteAddress;

  const headers = ip
    ? {
        "x-real-ip": ip,
        "x-forwarded-for": ip,
      }
    : undefined;

  const client = new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL,
    }),
    headers,
    cache: new InMemoryCache(),
  });

  const { data, error } = await client.query<T>({
    query,
    ...options,
  });

  const result = {
    messages,
    data,
    ip,
  };

  if (error) {
    return {
      ...result,
      error,
    };
  }

  return result;
};

export default useApolloQuery;
