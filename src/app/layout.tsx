import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import NavigationWrapper from "@/components/NavigationWrapper";
import Footer from "@/components/Footer";
import { PremiumBackground } from "@/components/PremiumBackground";
import { Providers } from "@/components/Providers";

import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "QuizMaster - Premium Interactive Quizzes",
  description: "Master any subject with interactive, multiplayer quizzes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${plusJakarta.variable} ${playfair.variable} font-sans`}>
        <Providers>
          <PremiumBackground />
          <NavigationWrapper />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
