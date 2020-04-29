import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import React from "react";
import { Global, css } from "@emotion/core";
import ReactDOM from "react-dom";
import App from "./App";
import "./i18n";
import { customTheme } from "./theme";
import { AppProvider } from "./AppProvider";
import Favicon from "react-favicon";
import { Helmet } from "react-helmet";

export const GlobalFonts = css`
  @font-face {
    font-family: Circular;
    src: url("/circular/lineto-circular-pro-bold.woff") format("woff");
    font-weight: 800;
    font-style: bold;
    font-display: fallback;
  }
  @font-face {
    font-family: Circular;
    src: url("/circular/lineto-circular-pro-book.woff") format("woff");
    font-weight: 500;
    font-style: normal;
    font-display: fallback;
  }

  @font-face {
    font-family: Circular;
    src: url("/circular/lineto-circular-pro-bookItalic.woff") format("woff");
    font-weight: 500;
    font-style: italic;
    font-display: fallback;
  }

  @font-face {
    font-family: Circular;
    src: url("/circular/lineto-circular-pro-medium.woff") format("woff");
    font-weight: 700;
    font-style: normal;
    font-display: fallback;
  }

  @font-face {
    font-family: Circular;
    src: url("/circular/lineto-circular-pro-mediumItalic.woff") format("woff");
    font-weight: 700;
    font-style: italic;
    font-display: fallback;
  }
`;

const rootElement = document.getElementById("root");
const RootApp = () => {
  let favicon =
    "https://i.ibb.co/HKmNJ4q/Screen-Shot-2020-04-29-at-10-28-37-AM.png";
  return (
    <React.StrictMode>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <Global styles={GlobalFonts} />

        <AppProvider>
          <Favicon url={favicon} />
          <Helmet>
            <meta charSet="utf-8" />
            <title>Corona Guide | Let's Fight Coronavirus Together</title>
            <link rel="canonical" href="https://www.covidguide.africa/" />
            <meta
              property="og:title"
              content="Let's fight coronavirus together - Covidguide.africa"
            />
            <meta
              property="og:description"
              content="Resources to help Africans with information about test centers, treatments and resources to fight for COVID 19.."
            />
            <meta property="og:image" content={favicon} />
            <meta property="og:url" content="https://www.covidguide.africa/" />

            <meta
              name="twitter:title"
              content="Let's fight coronavirus together - Covidguide.africa"
            />
            <meta
              name="twitter:description"
              content=" Resources to help Africans with information about test centers, treatments and resources to fight for COVID 19."
            />
            <meta name="twitter:image" content={favicon} />
            <meta name="twitter:card" content="logo_large_image"></meta>
          </Helmet>
          <App />
        </AppProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(<RootApp />, rootElement);
