import localFont from "next/font/local";
import "./globals.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ScrollToTop from "./components/Home/ScrollToTop";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css";
import "react-phone-number-input/style.css";
// import Nav from "./components/nav/nav";
// import Footer from "./components/footer/Footer";
const Nav = dynamic(() => import("./components/nav/nav"));
const Footer = dynamic(() => import("./components/footer/Footer"));

import AosProvider from "./components/shared/AosProvider";
import TranslationProvider from "./components/shared/TranslationProvider";
import Providers from "./QueryClientProvider";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import MobileFooterNav from "./components/nav/MobileFooterNav";
import { LayoutProvider } from "./providers/LayoutContext";

const somarSans = localFont({
  src: [
    {
      path: "../../public/fonts/SomarSans-Regular.ttf",
    },
  ],
  variable: "--font-somar-sans",
  display: "swap",
});

export const metadata = {
  title: "Elmy",
  description: "منصة تعليمية",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={somarSans.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          <AosProvider>
            <LayoutProvider>
              <TranslationProvider>
                <Nav />
                <ToastContainer />
                {children}
                <ScrollToTop />
                <MobileFooterNav />
                <Footer />
              </TranslationProvider>
            </LayoutProvider>
          </AosProvider>
        </Providers>
      </body>
    </html>
  );
}
