/* eslint-disable @typescript-eslint/no-var-requires */
import { render, screen } from "@testing-library/react";
import { Navigation } from "../src/components/Navigation";
import messages from "../src/config/locale/sk.json";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "styled-components";
import theme from "../src/config/theme";
import { Footer } from "../src/components/Footer";
import { ReactElement } from "react";
// import SimpleMapComponent from "@/components/SimpleMap/SimpleMapComponent";

const locale = "sk";

const Wrapper = ({ children }: { children: ReactElement }) => {
  return (
    <ThemeProvider theme={theme}>
      <NextIntlClientProvider messages={messages} locale={locale}>
        {children}
      </NextIntlClientProvider>
    </ThemeProvider>
  );
};

describe("Navigation", () => {
  it("renders menu title", async () => {
    render(
      <Wrapper>
        <Navigation logo={""} title="Lorem Ipsum" />
      </Wrapper>
    );
    const heading = await screen.findByText(messages.navigation.menu);
    expect(heading.textContent).toBeDefined();
  });

  it("renders datasets item", async () => {
    render(
      <Wrapper>
        <Navigation logo={""} title="Lorem Ipsum" />
      </Wrapper>
    );
    const heading = await screen.findByText(messages.navigation.datasets);
    expect(heading.textContent).toBeDefined();
  });

  it("renders developer item", async () => {
    render(
      <Wrapper>
        <Navigation logo={""} title="Lorem Ipsum" />
      </Wrapper>
    );
    const heading = await screen.findByText(messages.navigation.developer);
    expect(heading.textContent).toBeDefined();
  });

  it("renders contact item", async () => {
    render(
      <Wrapper>
        <Navigation logo={""} title="Lorem Ipsum" />
      </Wrapper>
    );
    const heading = await screen.findByText(messages.navigation.contact);
    expect(heading.textContent).toBeDefined();
  });
});

describe("Footer", () => {
  it("renders footer UP button", async () => {
    render(
      <Wrapper>
        <Footer logo={""} title={""} home={""} />
      </Wrapper>
    );
    const heading = await screen.findByText(messages.footer.up);
    expect(heading.textContent).toBeDefined();
  });

  it("renders footer link home", async () => {
    render(
      <Wrapper>
        <Footer logo={""} title={""} home={""} />
      </Wrapper>
    );
    const heading = await screen.findByText(messages.footer.links.home);
    expect(heading.textContent).toBeDefined();
  });

  it("renders footer link datasets", async () => {
    render(
      <Wrapper>
        <Footer logo={""} title={""} home={""} />
      </Wrapper>
    );
    const heading = await screen.findByText(messages.footer.links.datasets);
    expect(heading.textContent).toBeDefined();
  });

  it("renders footer link contact", async () => {
    render(
      <Wrapper>
        <Footer logo={""} title={""} home={""} />
      </Wrapper>
    );
    const heading = await screen.findByText(messages.footer.links.contact);
    expect(heading.textContent).toBeDefined();
  });

  it("renders report link manuals", async () => {
    render(
      <Wrapper>
        <Footer logo={""} title={""} home={""} />
      </Wrapper>
    );
    const heading = await screen.findByText(messages.footer.links.manuals);
    expect(heading.textContent).toBeDefined();
  });

  it("renders report link openAPI", async () => {
    render(
      <Wrapper>
        <Footer logo={""} title={""} home={""} />
      </Wrapper>
    );
    const heading = await screen.findByText(messages.footer.links.openAPI);
    expect(heading.textContent).toBeDefined();
  });

  it("renders report link provider", async () => {
    render(
      <Wrapper>
        <Footer logo={""} title={""} home={""} />
      </Wrapper>
    );
    const heading = await screen.findByText(
      messages.footer.navigation.provider
    );
    expect(heading.textContent).toBeDefined();
  });

  it("renders report link privacy", async () => {
    render(
      <Wrapper>
        <Footer logo={""} title={""} home={""} />
      </Wrapper>
    );
    const heading = await screen.findByText(messages.footer.navigation.privacy);
    expect(heading.textContent).toBeDefined();
  });

  it("renders report link accessibility", async () => {
    render(
      <Wrapper>
        <Footer logo={""} title={""} home={""} />
      </Wrapper>
    );
    const heading = await screen.findByText(
      messages.footer.navigation.accessibility
    );
    expect(heading.textContent).toBeDefined();
  });

  it("renders report link sitemap", async () => {
    render(
      <Wrapper>
        <Footer logo={""} title={""} home={""} />
      </Wrapper>
    );
    const heading = await screen.findByText(messages.footer.navigation.sitemap);
    expect(heading.textContent).toBeDefined();
  });
});

// describe("Map", () => {
//   it("renders menu title", async () => {
//     render(
//       <Wrapper>
//         <SimpleMapComponent />
//       </Wrapper>
//     );
//     const heading = await screen.findByText(messages.navigation.menu);
//     expect(heading.textContent).toBeDefined();
//   });
// });
