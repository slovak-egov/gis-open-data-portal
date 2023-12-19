import { Typography } from "@/lib/Typography";
import { useTranslations } from "use-intl";
import { Link } from "@/lib/Link";
import { Box } from "@/lib/Box";
import Head from "next/head";
import { NextApiResponse } from "next/types";
import { ErrorProps } from "next/error";

function Error() {
  const t = useTranslations();
  return (
    <>
      <Head>
        <title>{t("org.acronym") + " • " + t("error.general.title")}</title>
        <meta name="description" content={t("app.name")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Typography variant="heading.xl" label="error.general.heading" />
        <Typography variant="body.lead">
          {t("error.general.back") + " "}
          <Link label="error.general.homepage" to="/"></Link>.
        </Typography>
        <Box h={170} />
      </main>
    </>
  );
}

Error.getInitialProps = ({
  res,
  err,
}: {
  res: NextApiResponse;
  err: ErrorProps;
}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
