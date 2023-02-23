import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import store from "@/redux/store";
import { Provider } from "react-redux";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const Header = dynamic(
//   // typescript에서 props를 전달할때 interface를 정의해줍니다.
//   () => import("@/components/Header"), // Component로 사용할 항목을 import합니다.
//   { ssr: false } // ssr옵션을 false로 설정해줍니다.
// );

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
        <ToastContainer
          theme="light"
          newestOnTop={true}
          pauseOnHover={false}
          limit={1}
        />
      </Provider>
    </>
  );
}
