import React from "react";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth Portal",
  description: "Authentication portal.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} layout`}>
        <div className="w-full h-screen flex flex-col">{children}</div>
      </body>
    </html>
  );
}
