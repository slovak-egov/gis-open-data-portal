import type { AppProps } from "next/app";
import { NextIntlClientProvider } from "next-intl";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Layout } from "@/components/Layout";
import theme from "../config/theme";
import { useApollo } from "@/core/apolloClient";
import { ApolloProvider } from "@apollo/client";
import skMessages from "@/config/locale/sk.json";

const LOCALE = "sk";
const TIMEZONE = "Europe/Bratislava";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: ${theme.palette.white};
  }
  * {
    box-sizing: border-box;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo();
  return (
    <NextIntlClientProvider
      messages={skMessages}
      locale={LOCALE}
      timeZone={TIMEZONE}
      defaultTranslationValues={{
        bold: (chunks) => <b>{chunks}</b>,
      }}
    >
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Layout data={pageProps?.portal}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ApolloProvider>
    </NextIntlClientProvider>
  );
}
