import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Box } from "@/lib/Box";
import { Grid } from "@/lib/Grid/Grid";
import { Base64Icon, Icon } from "@/lib/Icon";
import { Link } from "@/lib/Link";
import { Spinner } from "@/lib/Search/Spinner";
import { Typography } from "@/lib/Typography";
import { Button } from "../Button";
import styled from "styled-components";
import theme from "@/config/theme";
import { DocumentNode } from "graphql";
import useApolloQuery from "@/core/apolloClient";
import { Feature } from "@/types/model";
const Row = styled(Grid)({
  padding: 5,
  cols: "1fr",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderTop: `1px solid ${theme.palette.grey[400]}`,
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
});

type BasicType = {
  [key: string]: BasicType;
};

type BaseProps = {
  graphQLQuery: DocumentNode;
  queryParams: { [key: string]: string | number | boolean | BasicType };
  redirectPath?: string;
  displayFeatureClassName?: boolean;
};

export const SearchResults = ({
  graphQLQuery,
  queryParams,
  displayFeatureClassName = true,
  redirectPath,
}: BaseProps) => {
  const t = useTranslations();
  const limit = 50;
  const [total, setTotal] = useState<number>(0);
  const [skip, setSkip] = useState<number>(0);
  const [loadedData, setLoadedData] = useState<Feature[]>([]);
  const [count, setCount] = useState<number>(0);
  const { data, state, pageInfo } = useApolloQuery({
    query: graphQLQuery,
    options: {
      variables: {
        ...queryParams,
        limit,
        skip,
      },
    },
  });

  useEffect(() => {
    if (state?.status === "success") {
      setLoadedData((prevState) => [...prevState, ...(data || [])]);
      setTotal(pageInfo.total || 0);
      setCount((prevState) => prevState + (data?.length || 0));
    }
  }, [data, state?.status, pageInfo?.total]);

  useEffect(() => {
    setSkip(0);
    setLoadedData([]);
    setCount(0);
    setTotal(0);
  }, [queryParams]);

  const handleFetchMore = () => {
    setSkip((prevState) => prevState + limit);
  };

  return (
    <>
      {count === 0 && state?.status === "success" ? (
        <Box pt={4}>
          <Typography variant="body.lead" label="search.results.none" />
        </Box>
      ) : (
        <Box pb={2}>
          <Typography variant="body.small" color="grey">
            {t("search.results.server", { count: total ?? 0 })}
          </Typography>
          <Typography variant="body.small" color="grey">
            {t("search.results.client", {
              count: count >= total ? t("search.results.all") : count,
            })}
          </Typography>
        </Box>
      )}
      <Grid
        pt={5}
        gap={0}
        columnGap={3}
        cols="1fr 1fr 1fr"
        md={{ cols: "1fr 1fr", gap: 3 }}
        sm={{ cols: "1fr", gap: 0 }}
      >
        <>
          {loadedData?.map((result: Feature) => (
            <Link
              to={redirectPath ? redirectPath + result.id : result.id}
              variant="invisible"
              key={result.id}
            >
              <Row>
                <Box display="flex" flexDirection="row" gap={2}>
                  {result?.featureClass?.icon ? (
                    <Base64Icon
                      src={result?.featureClass?.icon}
                      alt={result?.featureClass.code}
                    />
                  ) : (
                    <Icon variant="document" />
                  )}
                  <Box>
                    <Typography variant="body">
                      <b>{t("feature.code", { code: result.code })} </b>
                    </Typography>
                    <Typography variant="body">
                      {result?.customData
                        ?.filter((x) => x?.field?.label === true)
                        ?.map((i) => i?.value)
                        ?.join(", ")}
                    </Typography>
                    {displayFeatureClassName && (
                      <Typography variant="body">
                        {result?.featureClass?.name}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Row>
            </Link>
          ))}
        </>
      </Grid>
      {state?.status === "loading" && (
        <Box pt={4}>
          <Spinner />
        </Box>
      )}
      {state?.status === "success" && total > count && (
        <Box pt={4}>
          <Button
            variant="normal"
            onClick={handleFetchMore}
            label="search.results.fetch"
          />
        </Box>
      )}
    </>
  );
};
