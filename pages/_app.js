import "../styles/globals.css";
import "../styles/all.min.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        body {
          background-color: #1d1d1f;
        }
      `}</style>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
