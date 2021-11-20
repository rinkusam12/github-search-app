import "tailwindcss/tailwind.css";
import ContributerProvider from "../context/contributorContext";

function MyApp({ Component, pageProps }) {
  return (
    <ContributerProvider>
      <Component {...pageProps} />{" "}
    </ContributerProvider>
  );
}

export default MyApp;
