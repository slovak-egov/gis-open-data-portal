import { useTranslations } from "next-intl";
import { Box } from "@/lib/Box";
import { SearchInput } from "@/lib/Search/SearchInput";
import { Typography } from "@/lib/Typography";
import Head from "next/head";
import { SearchResults } from "@/lib/Search/SearchResults";
import { useRouter } from "next/router";
import { FEATURES_QUERY } from "@/queries/features.query";
import NoSSR from "react-no-ssr";
import { Button } from "@/lib/Button";
import Link from "next/link";
import { Dataset, FeatureClass, Portal } from "@/types/model";
import { DATASET_QUERY } from "@/queries/dataset.query";
import { NextApiRequest } from "next";
import { ssrRequest } from "@/core/apolloClient";

export default function DatasetDetail({
  data,
  dataset,
}: {
  data: FeatureClass;
  dataset: {
    featureClassDataset: Dataset;
  };
}) {
  const t = useTranslations();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{t("org.acronym") + " • Dataset"}</title>
        <meta name="description" content={t("app.name")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Typography variant="heading.xl">
          {data ? data.name : "Dataset"}
        </Typography>
        {t("dataset.datasetUrl")}
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}/features?filter.featureClass.id=${data.id}`}
        >
          {process.env.NEXT_PUBLIC_API_URL}
          /features?filter.featureClass.id=
          {data.id}
        </a>
        <NoSSR>
          {data.datasetUpdatedAt && (
            <Typography variant="body" color="grey">
              {t("dataset.updatedAt", {
                date: new Date(data.datasetUpdatedAt).toLocaleDateString(),
              })}
            </Typography>
          )}
          <Typography variant="body" color="grey">
            {t("dataset.validatedAt", {
              date: new Date().toLocaleDateString(),
            })}
          </Typography>
        </NoSSR>
        {dataset?.featureClassDataset && (
          <>
            {t("dataset.download")}
            <a href={`${process.env.NEXT_PUBLIC_API_URL}/data/${data.code}`}>
              {`${process.env.NEXT_PUBLIC_API_URL}/data/${data.code}`}
            </a>
            <NoSSR>
              {dataset?.featureClassDataset?.createdAt && (
                <Typography variant="body" color="grey">
                  {t("dataset.url.updatedAt", {
                    date: new Date(
                      dataset.featureClassDataset.createdAt
                    ).toLocaleDateString(),
                  })}
                </Typography>
              )}
            </NoSSR>
          </>
        )}
        <Box
          display="flex"
          justifyContent="space-between"
          pt={6}
          sm={{ flexDirection: "column" }}
        >
          <SearchInput
            width={450}
            label="dataset.search"
            endpoint={"dataset/" + data.id}
          />
          <Link href={"/map?fc=" + data.id}>
            <Button>{t("dataset.showOnMap")}</Button>
          </Link>
        </Box>
        <SearchResults
          graphQLQuery={FEATURES_QUERY}
          queryParams={{
            featureClassId: data.id,
            code: router.query.q as string,
          }}
          displayFeatureClassName={false}
          redirectPath="/feature/"
        />
      </main>
    </>
  );
}

interface DatasetPageResponse {
  featureClassDataset: Dataset;
  portal: Portal;
  featureClass: FeatureClass;
}

export async function getServerSideProps({
  locale,
  req,
  params,
}: {
  locale: string;
  req: NextApiRequest;
  params: { id: string };
}) {
  const { data, error, ...rest } = await ssrRequest<DatasetPageResponse>(
    locale,
    req,
    DATASET_QUERY,
    {
      variables: { id: params.id },
      errorPolicy: "all",
    }
  );

  if (error || !data?.featureClassDataset || !data?.portal) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...rest,
      portal: data?.portal,
      data: data?.featureClass,
      dataset: data?.featureClassDataset,
    },
  };
}
