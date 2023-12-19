/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "styled-components";
import { Layout } from "../src/components/Layout";
import Home from "../src/pages/index";
import Datasets from "../src/pages/datasets";
import Search from "../src/pages/search";
import Sitemap from "../src/pages/sitemap";
import Map from "../src/pages/map";
import theme from "../src/config/theme";
import "@testing-library/jest-dom/extend-expect";
import { createApolloClient } from "../src/core/apolloClient";
import { ApolloProvider } from "@apollo/client";
import messages from "../src/config/locale/sk.json";

const homeURL = "http://localhost/";
const locale = "sk";

const PageWrapper = ({ children, withoutApollo }) => {
  if (withoutApollo) {
    return (
      <ThemeProvider theme={theme}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </ThemeProvider>
    );
  }
  const client = createApolloClient();

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
};

const mockData = {
  results: [
    {
      id: 1,
      icon: "dropdown",
      title: "Test Result 1",
      description: "Testovací výsledok",
      link: "/test/result/1",
    },
    {
      id: 2,
      icon: "scroll.up",
      title: "Test Result 2",
      description: "Ďaľší testovací výsledok",
      link: "/test/result/2",
    },
  ],
  updatedAt: "2023-05-09T10:30:00.000Z",
  count: 2,
  url: "/data/search?t=dataset",
};

describe("Layout", () => {
  const useRouter = jest.spyOn(require("next/router"), "useRouter");

  useRouter.mockImplementationOnce(() => ({
    query: { locale: locale },
  }));

  const LayoutPage = () => {
    return (
      <PageWrapper withoutApollo={true}>
        <Layout />
      </PageWrapper>
    );
  };

  it("renders the ribbon text", async () => {
    render(<LayoutPage />);
    const ribbon = await screen.findByText(messages.ribbon.button.text);
    expect(ribbon.textContent).toBe("Oficiálna stránka verejnej správy SR");
  });

  it("renders the ribbon button", () => {
    render(<LayoutPage />);
    const button = screen.getAllByRole("button")[0];
    expect(button).toBeInTheDocument();
  });

  it("renders the page title", () => {
    render(<LayoutPage />);
    const heading = screen.getAllByRole("heading", { level: 3 })[0];
    expect(heading).toBeInTheDocument();
  });

  it("ensures the page title links to the home page", () => {
    render(<LayoutPage />);
    const heading = screen.getAllByRole("heading", { level: 3 })[0];
    const link = heading.querySelector("a");
    expect(link.href).toBe(homeURL);
  });

  it("renders all main menu items", () => {
    render(<LayoutPage />);
    const links = screen.getAllByRole("link");
    const datasets = links.filter((link) => link.textContent === "Datasety")[0];
    const developer = links.filter((link) => link.textContent === "OpenAPI")[0];
    const contact = links.filter((link) => link.textContent === "Kontakt")[0];
    expect(datasets).toBeVisible();
    expect(developer).toBeVisible();
    expect(contact).toBeVisible();
  });

  it("ensures that the menu items have correct links", () => {
    render(<LayoutPage />);
    const links = screen.getAllByRole("link");
    const datasets = links.filter((link) => link.textContent === "Datasety")[0];
    const developer = links.filter((link) => link.textContent === "OpenAPI")[0];
    const contact = links.filter((link) => link.textContent === "Kontakt")[0];
    expect(datasets.getAttribute("href")).toBe("/datasets");
    expect(developer.getAttribute("href")).toBe("/developer");
    expect(contact.getAttribute("href")).toBe("/contact");
  });

  it("renders the 'scroll up' button", () => {
    render(<LayoutPage />);
    const button = screen.getAllByText(messages.footer.up)[0];
    expect(button.textContent).toBe("Hore");
  });

  it("renders footer links", () => {
    render(<LayoutPage />);
    const provider = screen.getAllByText(
      messages.footer.navigation.provider
    )[0];
    const privacy = screen.getAllByText(messages.footer.navigation.privacy)[0];
    const accessibility = screen.getAllByText(
      messages.footer.navigation.accessibility
    )[0];
    const sitemap = screen.getAllByText(messages.footer.navigation.sitemap)[0];
    expect(provider.textContent).toBe("Prevádzkovateľ");
    expect(privacy.textContent).toBe("Ochrana súkromia");
    expect(accessibility.textContent).toBe("Informácie o prístupnosti");
    expect(sitemap.textContent).toBe("Mapa stránok");
  });
});

describe("Home Page", () => {
  const useRouter = jest.spyOn(require("next/router"), "useRouter");

  useRouter.mockImplementationOnce(() => ({
    query: { locale: locale },
  }));

  const mockPush = jest.fn();
  useRouter.mockImplementation(() => ({
    push: mockPush,
  }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  afterAll(() => {
    global.fetch.mockRestore();
  });

  const HomePage = () => {
    return (
      <PageWrapper>
        <Home />
      </PageWrapper>
    );
  };

  it("renders the page heading", async () => {
    render(<HomePage />);
    const heading = await screen.findByText(messages.index.heading);
    expect(heading.textContent).toBe("Otvorený prístup k mestským dátam");
  });

  it("renders the search field", async () => {
    render(<HomePage />);
    const searchInput = await screen.findByPlaceholderText(
      messages.index.search
    );
    expect(searchInput).toBeInTheDocument();
  });

  it("allows the user to type into the search field", async () => {
    render(<HomePage />);
    const input = await screen.findByPlaceholderText(messages.index.search);
    fireEvent.change(input, { target: { value: "Test" } });
    expect(input.value).toEqual("Test");
  });

});

describe("Dataset Page", () => {
  const useRouter = jest.spyOn(require("next/router"), "useRouter");

  useRouter.mockImplementationOnce(() => ({
    query: { locale: locale },
  }));

  const mockPush = jest.fn();
  useRouter.mockImplementation(() => ({
    push: mockPush,
  }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  afterAll(() => {
    global.fetch.mockRestore();
  });

  const DatasetsPage = () => {
    return (
      <PageWrapper>
        <Datasets />
      </PageWrapper>
    );
  };

  it("renders the page heading", async () => {
    render(<DatasetsPage />);
    const heading = await screen.findByText(messages.datasets.heading);
    expect(heading.textContent).toBe("Datasety");
  });
});

describe("Dataset Page", () => {
  const useRouter = jest.spyOn(require("next/router"), "useRouter");

  useRouter.mockImplementationOnce(() => ({
    query: { locale: locale },
  }));

  const mockPush = jest.fn();
  useRouter.mockImplementation(() => ({
    push: mockPush,
  }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  afterAll(() => {
    global.fetch.mockRestore();
  });

  const DatasetsPage = () => {
    return (
      <PageWrapper>
        <Datasets />
      </PageWrapper>
    );
  };

  it("renders the page heading", async () => {
    render(<DatasetsPage />);
    const heading = await screen.findByText(messages.datasets.heading);
    expect(heading.textContent).toBe("Datasety");
  });
});

describe("Sitemap Page", () => {
  const useRouter = jest.spyOn(require("next/router"), "useRouter");

  useRouter.mockImplementationOnce(() => ({
    query: { locale: locale },
  }));

  const mockPush = jest.fn();
  useRouter.mockImplementation(() => ({
    push: mockPush,
  }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    global.fetch.mockRestore();
  });

  const SitemapPage = () => {
    return (
      <PageWrapper>
        <Sitemap />
      </PageWrapper>
    );
  };

  it("renders the page heading", async () => {
    render(<SitemapPage />);
    const heading = await screen.findByText(messages.sitemap.heading);
    expect(heading.textContent).toBe("Mapa stránok");
  });
});

describe("Search Page", () => {
  const useRouter = jest.spyOn(require("next/router"), "useRouter");

  useRouter.mockImplementationOnce(() => ({
    query: { locale: locale },
  }));

  const mockPush = jest.fn();
  useRouter.mockImplementation(() => ({
    push: mockPush,
  }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    global.fetch.mockRestore();
  });

  const SearchPage = () => {
    return (
      <PageWrapper>
        <Search />
      </PageWrapper>
    );
  };

  it("renders the page heading", async () => {
    render(<SearchPage />);
    const heading = await screen.findByText(messages.search.heading);
    expect(heading.textContent).toBe("Vyhľadávanie");
  });
});

describe("Map Page", () => {
  const useRouter = jest.spyOn(require("next/router"), "useRouter");

  useRouter.mockImplementationOnce(() => ({
    query: { locale: locale, fc: "" },
  }));

  const mockPush = jest.fn();
  useRouter.mockImplementation(() => ({
    push: mockPush,
  }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    global.fetch.mockRestore();
  });

  it("renders the page heading", async () => {
    render(
      <PageWrapper>
        <Map />
      </PageWrapper>
    );
    const heading = await screen.findByText(messages.map.heading);
    expect(heading.textContent).toBe("Mapa");
  });
});
