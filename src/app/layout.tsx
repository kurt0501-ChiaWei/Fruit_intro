import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Noto_Serif_TC } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderSignup from "@/components/OrderSignup";
import LuckyDraw from "@/components/LuckyDraw";
import WelcomeName from "@/components/WelcomeName";
import Greeting from "@/components/Greeting";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 中文標題用的襯線字（明體）
const notoSerif = Noto_Serif_TC({
  variable: "--font-noto-serif",
  weight: ["700", "900"],
  subsets: ["latin"],
  preload: false,
});

// 數字與英文點綴用的襯線字
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "台灣好果｜台灣水果產季誌",
  description: "認識台灣代表性水果、產地與產季。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col overflow-x-hidden bg-paper text-ink">
        <Header />
        <div className="relative z-10 flex-1">{children}</div>
        <OrderSignup />
        <Footer />
        <Greeting />
        <LuckyDraw />
        <WelcomeName />
      </body>
    </html>
  );
}
