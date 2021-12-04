import "../styles/globals.css";
import "../styles/all.min.css";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

const MyApp = ({ Component, pageProps }) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/img/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/img/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/img/favicon-16x16.png"
        />
        <link rel="manifest" href="/img/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/img/safari-pinned-tab.svg"
          color="#3b7ce7"
        />
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta name="theme-color" content="#1D1D1F" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <style jsx global>{`
        body {
          background-color: #1d1d1f;
        }
      `}</style>
      <Header />
      <div className={theme === "light" || "dark"}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </ThemeContext.Provider>
  );
};

export default MyApp;
