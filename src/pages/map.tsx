import { Box } from "@/lib/Box";
import { Grid } from "@/lib/Grid/Grid";
import { MapClient } from "@/components/MapClientAdapter";
import { Typography } from "@/lib/Typography";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { PORTAL_QUERY } from "@/queries/portal.query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NextApiRequest } from "next";
import { ssrRequest } from "@/core/apolloClient";
import { Portal } from "@/types/model";

export default function Home() {
  const t = useTranslations();

  const [featureClassId, setFeatureClassId] = useState<string | undefined>(
    undefined
  );
  const router = useRouter();

  useEffect(() => {
    const fc = router.query?.fc;
    if (Array.isArray(fc)) {
      setFeatureClassId(fc.join(" "));
    } else {
      setFeatureClassId(fc);
    }
  }, [router.query?.fc]);

  return (
    <>
      <Head>
        <title>{t("org.acronym") + " • " + t("map.title")}</title>
        <meta name="description" content={t("app.name")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Typography variant="heading.xl" label="map.heading" />
        <Grid sm={{ cols: "1fr" }} xl={{ cols: "550px" }}>
          <Typography variant="body.lead">
            {t("map.description") + " "}
          </Typography>
        </Grid>
        <Box pt={6}>
          {featureClassId && <MapClient featureClassId={featureClassId} />}
        </Box>
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
