import { ReactElement } from "react";
import { Box } from "@/lib/Box";
import { Container } from "@/lib/Grid/Container";
import { Font } from "@/lib/Font";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";
import { Ribbon } from "./Ribbon";
import { Portal } from "@/types/model";

interface LayoutProps {
  children: ReactElement;
  data: Portal[];
}

export const Layout = ({ children, data }: LayoutProps) => {
  const logo = data?.find((item: Portal) => item.key === "common.logo");
  const title = data?.find((item: Portal) => item.key === "portal.title");
  const home = data?.find((item: Portal) => item.key === "portal.footer.home");
  return (
    <Box className={Font.className}>
      <Ribbon />
      <Container>
        <Navigation
          logo={logo?.data?.value || ""}
          title={title?.data?.value || ""}
        />
        {children}
      </Container>
      <Footer
        logo={logo?.data?.value || ""}
        title={title?.data?.value || ""}
        home={home?.data.value || ""}
      />
    </Box>
  );
};
