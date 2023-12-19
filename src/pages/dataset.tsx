import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { Box } from "@/lib/Box";
import { SearchInput } from "@/lib/Search/SearchInput";
import { Typography } from "@/lib/Typography";
import Head from "next/head";
import { PORTAL_QUERY } from "@/queries/portal.query";
import { ssrRequest } from "@/core/apolloClient";
import { Portal } from "@/types/model";
import { NextApiRequest } from "next/types";

type Data = {
  id: number;
  name: string;
  code: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export default function Dataset() {
  const t = useTranslations();
  const router = useRouter();
  const [data, setData] = useState<Data>();
  const query = router?.query?.p as string;

  useEffect(() => {
    if (!query) {
      return;
    }

    fetch(`/data/dataset?q=${query}`)
      .then((res) => res.json())
      .then((data) => setData(data.result));
  }, [query]);

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
        <Typography variant="body" color="grey">
          {data ? data.description : "..."}
        </Typography>
        <Box pt={6}>
          <SearchInput width={450} label="dataset.search" endpoint="dataset" />
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
