import { useTranslations } from "next-intl";
import { Box } from "@/lib/Box";
import { Typography } from "@/lib/Typography";
import Head from "next/head";
import { FEATURE_PAGE_QUERY } from "@/queries/features.query";
import { Grid } from "@/lib/Grid/Grid";
import { OverviewMap } from "@/components/OverviewMapAdapter";
import { CustomDataType } from "@/types/types";
import { CustomData } from "@/lib/CustomData";
import { Divider } from "@/lib/Divider";
import { Feature, Portal } from "@/types/model";
import { ssrRequest } from "@/core/apolloClient";
import { NextApiRequest } from "next/types";

export default function FeatureDetail({ data }: { data: Feature }) {
  const t = useTranslations();

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
          {data ? data?.featureClass?.name : ""}
        </Typography>
        <Divider />
        <Grid cols="1fr 1fr" md={{ columnGap: 2, cols: "1fr" }}>
          <Box>
            <Typography variant="heading.large">
              {t("feature.code", { code: data ? data?.code : "" })}
            </Typography>

            {data?.customData?.map(
              (customData: CustomDataType, idx: number) => (
                <CustomData data={customData} idx={idx} key={idx} />
              )
            )}
          </Box>
          <Box>
            <OverviewMap feature={data} />
          </Box>
        </Grid>
      </main>
    </>
  );
}

interface FeaturePageResponse {
  portal: Portal;
  feature: Feature;
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
  const { data, error, ...rest } = await ssrRequest<FeaturePageResponse>(
    locale,
    req,
    FEATURE_PAGE_QUERY,
    {
      variables: { id: params.id },
      errorPolicy: "all",
    }
  );

  if (error || !data?.feature || !data?.portal) {
    return {
      notFound: true,
    };
  }

  return {
    props: { ...rest, portal: data?.portal, data: data?.feature },
  };
}
