import { NavMenuAside, NavMenuHeader } from "@/components/nav-menu";
import { SessionProvider } from "next-auth/react";
import ThemeToggle from "@/app/(home)/(dashboard)/theme-toggle";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <div className="fixed bottom-6 right-6">
        <ThemeToggle />
      </div>
      <div className="flex min-h-screen w-full flex-col">
        <NavMenuAside />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 min-h-screen">
          <NavMenuHeader />
          <div className="w-full mx-auto grid max-w-7xl flex-1 auto-rows-max gap-4 px-2 sm:px-4">
            {children}
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}
