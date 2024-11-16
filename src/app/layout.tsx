import type { Metadata } from "next";

import "/globals.scss";

import { Oxanium } from "next/font/google";

const oxanium = Oxanium({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "The Planets of Star Wars",
  description: "View and search for any planet in the galaxy!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={oxanium.className + " " + "body"}>{children}</body>
    </html>
  );
}
