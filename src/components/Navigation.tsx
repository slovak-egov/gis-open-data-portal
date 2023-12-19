import { useState } from "react";
import { Button } from "@/lib/Button";
import { Link } from "@/lib/Link";
import { Typography } from "@/lib/Typography";
import { Logo } from "./Logo";
import { Grid } from "@/lib/Grid/Grid";
import { Box } from "@/lib/Box";

interface Props {
  logo: string;
  title: string;
}

export const Navigation = ({ logo, title }: Props) => {
  const [isClicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked((prevState) => !prevState);
  };

  return (
    <>
      <Grid
        w="100%"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        pt={7.5}
        pb={7.5}
        sm={{ pt: 3.25, pb: 3.25, display: "flex" }}
      >
        <Grid
          w="100%"
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={4}
        >
          <Logo variant="header" src={logo} />
          <Box>
            <Typography variant="heading.medium">
              <Link variant="title" to="/">
                {title}
              </Link>
            </Typography>
          </Box>
        </Grid>
        <Grid
          gap={0}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-end"
          whiteSpace="nowrap"
          sm={{ display: "none" }}
        >
          <Link
            variant="navigation"
            label="navigation.datasets"
            to="/datasets"
          />
          <Link
            variant="navigation"
            label="navigation.developer"
            to="/developer"
          />
          <Link variant="navigation" label="navigation.contact" to="/contact" />
        </Grid>
        <Grid
          display="none"
          sm={{
            gap: 0,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            whiteSpace: "nowrap",
          }}
        >
          <Button
            variant="navigation"
            label="navigation.menu"
            isClicked={isClicked}
            onClick={handleClick}
            links={[
              { label: "navigation.datasets", to: "/datasets" },
              { label: "navigation.developer", to: "/developer" },
              { label: "navigation.contact", to: "/contact" },
            ]}
          />
        </Grid>
      </Grid>
    </>
  );
};
