import theme from "@/config/theme";
import { Box } from "@/lib/Box";
import { Button } from "@/lib/Button";
import { Container } from "@/lib/Grid/Container";
import { Divider } from "@/lib/Divider";
import { Grid } from "@/lib/Grid/Grid";
import { Link } from "@/lib/Link";
import { Typography } from "@/lib/Typography";
import { Logo } from "./Logo";
import { useTranslations } from "next-intl";

interface Props {
  logo: string;
  title: string;
  home: string;
}

export const Footer = ({ logo, title, home }: Props) => {
  const t = useTranslations();
  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <Container>
        <Grid
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          mt={15}
        >
          <Button
            variant="success"
            label="footer.up"
            startAdornment="scroll.up"
            onClick={handleScroll}
          />
        </Grid>
      </Container>
      <Box
        backgroundColor={theme.palette.grey[400]}
        pt={theme.spacing(2.5)}
        pb={theme.spacing(2.5)}
      >
        <Container>
          <Grid
            sm={{ cols: "1fr", rowGap: theme.spacing(2.5) }}
            md={{ cols: "1fr 1fr", columnGap: theme.spacing(3.75) }}
            cols="2fr 1fr"
            columnGap={theme.spacing(3.75)}
          >
            <Box>
              <Typography variant="heading.medium">{title}</Typography>
              <Divider />
              <Grid
                cols="1fr 1fr"
                columnGap={15}
                md={{ cols: "1fr" }}
                sm={{ rowGap: theme.spacing(0.5) }}
              >
                <Grid rows="1fr" sm={{ rowGap: theme.spacing(0.5) }}>
                  <Link
                    color="dark"
                    label="footer.links.home"
                    to={home}
                    target="_blank"
                  />
                  <Link
                    color="dark"
                    label="footer.links.datasets"
                    to="/datasets"
                  />
                </Grid>
                <Grid rows="1fr" sm={{ rowGap: theme.spacing(0.5) }}>
                  <Link color="dark" label="footer.links.report" to="/report" />
                  <Link
                    color="dark"
                    label="footer.links.contact"
                    to="/contact"
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Typography
                variant="heading.medium"
                label="footer.links.heading"
              />
              <Divider />
              <Grid rows="1fr" sm={{ rowGap: theme.spacing(0.5) }}>
                <Link color="dark" label="footer.links.manuals" to="/manuals" />
                <Link
                  color="dark"
                  label="footer.links.openAPI"
                  to="/developer"
                />
              </Grid>
            </Box>
          </Grid>
          <Divider top={10} bottom={7} />
          <Grid md={{ cols: "1fr", rowGap: 10 }} cols="2fr 1fr" columnGap={15}>
            <Box>
              <Grid rows="1fr" rowGap={2}>
                {" "}
                <Typography variant="caption.medium">
                  {t("footer.provider") + " " + title}.
                </Typography>
                <Typography variant="caption.medium">
                  {t("footer.idsk.text") + " "}
                  <Link
                    color="dark"
                    target="_blank"
                    label="footer.idsk.link"
                    to="https://idsk.gov.sk"
                  />
                  .
                </Typography>
                <Grid
                  display="flex"
                  flexDirection="row"
                  pt={4}
                  xs={{ display: "grid", gap: 1.8 }}
                >
                  <Typography variant="body.small">
                    <Link
                      color="dark"
                      label="footer.navigation.provider"
                      to="/provider"
                    />
                  </Typography>
                  <Typography variant="body.small">
                    <Link
                      color="dark"
                      label="footer.navigation.privacy"
                      to="/privacy"
                    />
                  </Typography>
                  <Typography variant="body.small">
                    <Link
                      color="dark"
                      label="footer.navigation.accessibility"
                      to="/accessibility"
                    />
                  </Typography>
                  <Typography variant="body.small">
                    <Link
                      color="dark"
                      label="footer.navigation.sitemap"
                      to="/sitemap"
                    />
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box md={{ display: "flex", justifyContent: "center" }}>
              <Logo variant="footer" src={logo} />
            </Box>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
