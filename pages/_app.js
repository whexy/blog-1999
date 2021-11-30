import "../styles/globals.css";
import "../styles/all.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        body {
          background-color: #1d1d1f;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
