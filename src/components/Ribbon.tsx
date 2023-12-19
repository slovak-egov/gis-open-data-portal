import styled from "styled-components";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Box } from "@/lib/Box";
import { Button } from "@/lib/Button";
import { Container } from "@/lib/Grid/Container";
import { Grid } from "@/lib/Grid/Grid";
import { Link } from "@/lib/Link";
import { Typography } from "@/lib/Typography";
import CookieConsent from "./CookieConsent";

const Tricolor = styled.div({
  width: "100%",
  height: "3px",
  backgroundSize: "150px 100%",
  backgroundRepeat: "repeat",
  backgroundImage:
    "linear-gradient(to right, #fff 0%, #fff 33.3%, #003183 33.3%, #003183 66.6%, #d0190f 66.6%, #d0190f 100%)",
});

export const Ribbon = () => {
  const t = useTranslations();
  const [isClicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked((prevState) => !prevState);
  };

  return (
    <>
      <Tricolor />
      <Box
        h={42}
        display="flex"
        flexDirection="row"
        alignItems="center"
        backgroundColor="secondary"
      >
        <Container>
          <Typography variant="body" color="light">
            {t("ribbon.button.text") + " "}
            <Button
              variant="contrast"
              label="ribbon.button.link"
              isClicked={isClicked}
              onClick={handleClick}
              endAdornment="dropdown"
            />
          </Typography>
        </Container>
      </Box>
      {isClicked && (
        <Box backgroundColor="secondary">
          <Container>
            <Grid
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="flex-start"
              gap={7.5}
              sm={{ flexDirection: "column", gap: 3 }}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
                flex="50%"
                gap={0}
              >
                <Typography
                  variant="heading.small"
                  color="light"
                  label="ribbon.domain.heading"
                />
                <Typography variant="body" color="light">
                  {t("ribbon.domain.text") + " "}
                  <Link
                    color="light"
                    target="_blank"
                    label="ribbon.domain.link"
                    to="https://www.slovensko.sk/sk/agendy/agenda/_organy-verejnej-moci"
                  />
                  .
                </Typography>
              </Box>
              <Grid
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
                flex="50%"
                gap={0}
              >
                <Typography
                  variant="heading.small"
                  color="light"
                  label="ribbon.security.heading"
                />
                <Typography
                  variant="body"
                  color="light"
                  label="ribbon.security.text"
                />
              </Grid>
            </Grid>
          </Container>
          <Box h={20} />
        </Box>
      )}
      <CookieConsent />
    </>
  );
};
