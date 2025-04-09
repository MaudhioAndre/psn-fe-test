import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


import 'bootstrap/dist/css/bootstrap.min.css';

import "primereact/resources/themes/lara-light-cyan/theme.css";
import Footer from "./components/Footer";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PSN-FE-Test by Maudhio Andre Wijaya",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
