import {Inter} from "next/font/google";
import "../globals.css";
import SidebarProvider from "@/app/(home)/(dashboard)/SidebarContext";
import {Sidebar} from "@/app/(home)/(dashboard)/Sidebar";
import {Header} from "@/app/(home)/(dashboard)/Header";
import {SessionProvider} from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
      <html lang="en">
      <body className={`${inter.className} layout`} suppressHydrationWarning={true}>
      {
          <div className="flex">
              <SessionProvider>
                  <SidebarProvider>
                      <Sidebar></Sidebar>
                          <Header></Header>
                          {children}
                  </SidebarProvider>
              </SessionProvider>
          </div>
      }
      </body>
      </html>
    );
}
