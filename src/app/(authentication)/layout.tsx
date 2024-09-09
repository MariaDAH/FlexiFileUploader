import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth Portal",
  description: "Authentication portal.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex flex-col">{children}</div>;
}
