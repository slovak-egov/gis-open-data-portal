import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Box } from "@/lib/Box";
import { Grid } from "@/lib/Grid/Grid";
import { SearchInput } from "@/lib/Search/SearchInput";
import { SearchResults } from "@/lib/Search/SearchResults";
import { Typography } from "@/lib/Typography";
import Head from "next/head";
import { SEARCH_QUERY } from "@/queries/search.query";
import { PORTAL_QUERY } from "@/queries/portal.query";
import { ssrRequest } from "@/core/apolloClient";
import { NextApiRequest } from "next/types";
import { Portal } from "@/types/model";

export default function Search() {
  const t = useTranslations();
  const router = useRouter();
  const [query, setQuery] = useState<string | undefined>(undefined);

  useEffect(() => {
    const q = router?.query?.q;
    if (Array.isArray(q)) {
      setQuery(q.join(" "));
    } else {
      setQuery(q);
    }
  }, [router?.query?.q]);

  return (
    <>
      <Head>
        <title>{t("org.acronym") + " • " + t("index.title")}</title>
        <meta name="description" content={t("app.name")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Grid sm={{ cols: "1fr" }} xl={{ cols: "550px" }}>
          <Typography variant="heading.xl" label="search.heading" />
        </Grid>
        <Box pt={4}>
          <SearchInput
            width={450}
            label={query ? "search.newSearch" : "search.search"}
            endpoint="search"
          />
        </Box>
        <Box pt={4}>
          <SearchResults
            graphQLQuery={SEARCH_QUERY}
            queryParams={{ search: (query as string) || "" }}
            redirectPath="feature/"
          />
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
