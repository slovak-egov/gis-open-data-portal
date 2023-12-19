import { useEffect, useState } from "react";
import { hasCookie, setCookie } from "cookies-next";
import { Button } from "@/lib/Button";
import { Typography } from "@/lib/Typography";
import { useTranslations } from "next-intl";
import { Box } from "@/lib/Box";
import { Container } from "@/lib/Grid/Container";
import theme from "@/config/theme";

const CookieConsent = () => {
  const t = useTranslations();
  const [showConsent, setShowConsent] = useState(true);

  useEffect(() => {
    setShowConsent(hasCookie("consent"));
  }, []);

  const acceptCookie = () => {
    setShowConsent(true);
    setCookie("consent", "true", {});
  };

  if (showConsent) {
    return null;
  }

  return (
    <Box backgroundColor={theme.palette.grey[200]}>
      <Container>
        <Box display="flex" flexDirection="row" pt={3} pb={3} gap={4}>
          <Typography variant="body">{t("app.cookies")}</Typography>
          <Button variant="success" onClick={() => acceptCookie()}>
            {t("app.cookiesAccept")}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CookieConsent;
