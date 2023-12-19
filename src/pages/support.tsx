import RichTextField from "@/components/RichTextField";
import { PORTAL_QUERY } from "@/queries/portal.query";
import { useTranslations } from "next-intl";
import { Portal } from "@/types/model";
import Head from "next/head";
import { ssrRequest } from "@/core/apolloClient";
import { NextApiRequest } from "next/types";

export default function Support({ portal = [] }: { portal: Portal[] }) {
  const t = useTranslations();
  const page = portal.find((item) => item.key === "portal.page.support");
  const data = page?.data.value;

  return (
    <>
      <Head>
        <title>{t("org.acronym") + " • " + t("support.title")}</title>
        <meta name="description" content={t("app.name")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{data && <RichTextField content={data} />}</main>
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
