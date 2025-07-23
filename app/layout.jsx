import { Poppins, Caveat } from "next/font/google";
import "./globals.css";
import EventProvider from "@/contexts/EventContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Events App",
  description: "A Site for ecoturimo events",
};

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const caveat = Caveat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-caveat",
});

export default function RootLayout({ children }) {
  return (
    <EventProvider>
      <html lang="en">
        <body className={`${poppins.variable} ${caveat.variable} antialiased`}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </EventProvider>
  );
}
