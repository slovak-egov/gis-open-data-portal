import { parseSitemapXml } from "@/core/utils";
import { Typography } from "@/lib/Typography";
import { PORTAL_QUERY } from "@/queries/portal.query";
import { useTranslations } from "next-intl";
import Head from "next/head";
import fs from "fs";
import { Link } from "@/lib/Link";
import { Box } from "@/lib/Box";
import { Portal, Sitemap } from "@/types/model";
import { ssrRequest } from "@/core/apolloClient";
import { NextApiRequest } from "next/types";

export default function Sitemap({ sitemap }: { sitemap: Sitemap[] }) {
  const t = useTranslations();
  return (
    <>
      <Head>
        <title>{t("org.acronym") + " • " + t("sitemap.title")}</title>
        <meta name="description" content={t("app.name")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Typography variant="heading.xl" label="sitemap.heading" />
        <Box mt={5} display="flex" flexDirection="column">
          <ul>
            {(sitemap || []).map((item, idx) => {
              if (idx === 0) {
                return (
                  <li key={item.loc}>
                    <Link to={item.loc}>{t("sitemap.home")}</Link>
                  </li>
                );
              }
              return (
                <li key={item.loc}>
                  <Link to={item.loc}>
                    {t(
                      `sitemap.${
                        item.loc.split("/")[item.loc.split("/").length - 1]
                      }`
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
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
  let formattedSitemap: Sitemap[] = [];
  try {
    const filePath = "public/sitemap.xml";
    const sitemapContent = fs.readFileSync(filePath, "utf-8");

    formattedSitemap = parseSitemapXml(sitemapContent);
  } catch (e) {
    console.log(e);
  }

  return {
    props: { ...rest, portal: data?.portal, sitemap: formattedSitemap },
  };
}
