import { Box } from "@/lib/Box";
import { Link } from "@/lib/Link";
import { Typography } from "@/lib/Typography";
import { useTranslations } from "next-intl";
import Head from "next/head";

export default function NotFound() {
  const t = useTranslations();
  return (
    <>
      <Head>
        <title>{t("org.acronym") + " • " + t("notFound.title")}</title>
        <meta name="description" content={t("app.name")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Typography variant="heading.xl" label="notFound.heading" />
        <Typography variant="body.lead">
          {t("notFound.back") + " "}
          <Link label="notFound.homepage" to="/"></Link>.
        </Typography>
        <Box h={170} />
      </main>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: (await import(`../config/locale/${locale}.json`)).default,
    },
  };
}
