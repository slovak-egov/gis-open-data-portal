import { useTranslations } from "next-intl";
import { Box } from "@/lib/Box";
import { Link } from "@/lib/Link";
import { Typography } from "@/lib/Typography";
import Head from "next/head";
import { Grid } from "@/lib/Grid/Grid";
import { Base64Icon, Icon } from "@/lib/Icon";
import styled from "styled-components";
import theme from "@/config/theme";
import useApolloQuery, { ssrRequest } from "@/core/apolloClient";
import { FEATURE_CLASSES_QUERY } from "@/queries/feature-class.query";
import { PORTAL_QUERY } from "@/queries/portal.query";
import { FeatureClass, Portal } from "@/types/model";
import { NextApiRequest } from "next/types";

const ICON =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABbUlEQVR4nO2YMUoDQRSGP3A14EFkG29gbQrRzsYDeBabFJaSzmvY5AA5gyYgIiHoDXYlMIFhM2923uykWHwfvCqz/7z35k/zg2EYBjABqjFuogZmwNbVHLguMEztdFfAGphSeNsPwAJogDZQOcNMIrrvJRq/AJ6AjdC0VD/AK3ALnA3QPdq2NeW/jFZXzV3CVhqhyaGDNiUG+OrZ5Mz92bq/VW7D84xhthFdNaELlsAjcB4553MCXAHPwHek8aVSN2uAOvGcxP5lSuuKpApoLzqW7gE2gIC9QCpmIQGzUCpmIQGzUCpmIQGzUCpmIQGzUCpmIQGzUCr/wkJ14FxfnJirq0YS2KV198BbJFXz48TTQrpqQvHHPoluFdUNenN0P/XtH4qUyka1uhvgpsQArXD5wgW1uXFi26O7s1YWsQt+gRfgMvBdapyo1VXzUWArKUFvU2LbIaZuiJWXGA+hO4yfRI+OqvS2DcNgnPwB1XKn7PODoqkAAAAASUVORK5CYII=";

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

const Header = styled(Grid)({
  padding: 5,
  cols: "1fr",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
});

export default function Datasets() {
  const t = useTranslations();
  const { data } = useApolloQuery({ query: FEATURE_CLASSES_QUERY });

  return (
    <>
      <Head>
        <title>{t("org.acronym") + " • " + t("datasets.title")}</title>
        <meta name="description" content={t("app.name")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Typography variant="heading.xl" label="datasets.heading" />
        <Grid pt={5} gap={0} cols="1fr" sm={{ cols: "1fr", gap: 0 }}>
          <Header>
            <Typography variant="heading.small">
              {t("datasets.dataset")}
            </Typography>
            <Typography variant="heading.small">
              {t("datasets.lastupdated")}
            </Typography>
          </Header>
          {data?.map((result: FeatureClass) => (
            <Link
              to={`dataset/${result.id}`}
              variant="invisible"
              key={result.id}
            >
              <Row>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  gap={2}
                >
                  {result?.icon ? (
                    <Base64Icon src={result?.icon} alt={result?.code} />
                  ) : (
                    <Icon variant="document" />
                  )}
                  <Typography variant="body">{result.name}</Typography>
                </Box>
                <Box display="flex" gap={2} alignItems="center">
                  <Typography variant="body.small">
                    {result.datasetUpdatedAt &&
                      new Date(result.datasetUpdatedAt).toLocaleDateString()}
                  </Typography>
                  <Link to={`map?fc=${result.id}`} legacyBehavior>
                    <Base64Icon src={ICON} alt="map-icon" />
                  </Link>
                </Box>
              </Row>
            </Link>
          ))}
        </Grid>
      </main>
    </>
  );
}

export async function getServerSideProps({
  locale,
  req,
}: {
  locale: string;
  req: NextApiRequest;
}) {
  const { data, ...rest } = await ssrRequest<{ portal: Portal }>(
    locale,
    req,
    PORTAL_QUERY
  );
  return {
    props: { ...rest, portal: data?.portal },
  };
}
