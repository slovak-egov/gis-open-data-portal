import { ssrRequest } from "@/core/apolloClient";
import { Box } from "@/lib/Box";
import { Grid } from "@/lib/Grid/Grid";
import { Base64Icon, Icon } from "@/lib/Icon";
import { Link } from "@/lib/Link";
import { SearchInput } from "@/lib/Search/SearchInput";
import { Typography } from "@/lib/Typography";
import { HOME_QUERY } from "@/queries/home.query";
import { FeatureClass, Portal } from "@/types/model";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { NextApiRequest } from "next/types";

export default function Home({ data }: { data: FeatureClass[] }) {
  const t = useTranslations();

  return (
    <>
      <Head>
        <title>{t("org.acronym") + " • " + t("index.title")}</title>
        <meta name="description" content={t("app.name")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Typography variant="heading.xl" label="index.heading" />
        <Typography variant="body.lead">{t("index.description")}.</Typography>
        <Box pt={6} pb={6}>
          <SearchInput width={450} label="index.search" endpoint="search" />
        </Box>
        <Typography variant="heading.large" label="index.datasets" />
        <Grid pt={5} gap={0} cols="1fr 1fr" sm={{ cols: "1fr", gap: 0 }}>
          {data?.map((result: FeatureClass) => (
            <Box
              key={result.id}
              pb={6}
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={3}
            >
              <Box display="flex" alignItems="center">
                {result.icon ? (
                  <Base64Icon src={result.icon} />
                ) : (
                  <Icon variant="document" />
                )}
              </Box>
              <Box>
                <Link to={"dataset/" + result.id} color="dark">
                  <Typography variant="caption.medium">
                    {result.name}
                  </Typography>
                </Link>
              </Box>
            </Box>
          ))}
        </Grid>
      </main>
    </>
  );
}

interface HomePageData {
  featureClasses: { data: FeatureClass[] };
  portal: Portal;
}

export async function getServerSideProps({
  locale,
  req,
}: {
  locale: string;
  req: NextApiRequest;
}) {
  const { data, ...rest } = await ssrRequest<HomePageData>(
    locale,
    req,
    HOME_QUERY
  );
  return {
    props: {
      ...rest,
      data: data?.featureClasses?.data || [],
      portal: data?.portal,
    },
  };
}
