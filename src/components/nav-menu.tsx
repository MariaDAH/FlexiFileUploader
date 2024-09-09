"use client";

import Link from "next/link";
import { Package2, PanelLeft, SaveAll, Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { menuItems } from "@/context/interfaces/menu-items";
import { useLocale } from "@/hooks/use-locale";

export function NavMenuAside() {
  const { locale, set: setLocale } = useLocale({ initializeWithValue: false });

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <SaveAll className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">FlexiFile</span>
        </Link>

        {menuItems.map(({ name, href, icon: IconComponent }) => (
          <Tooltip key={href}>
            <TooltipTrigger asChild>
              <Link
                href={href}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <IconComponent className="h-5 w-5" />
                <span className="sr-only">{name}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{name}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              onClick={() => setLocale(locale === "en" ? "es" : "en")}
            >
              {locale.toUpperCase()}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Change language</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}

export function NavMenuHeader() {
  const { locale, set: setLocale } = useLocale({ initializeWithValue: false });

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <div className="flex flex-col h-full">
            <nav className="grid gap-6 text-lg font-medium">
              <SheetClose asChild>
                <Link
                  href="/"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <SaveAll className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">FlexiFile</span>
                </Link>
              </SheetClose>

              {menuItems.map(({ name, href, icon: IconComponent }) => (
                <SheetClose key={href} asChild>
                  <Link
                    href={href}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <IconComponent className="h-5 w-5" />
                    {name}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto text-black">
              <Button
                variant="ghost"
                size="lg"
                className="flex h-9 w-full items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                onClick={() => setLocale(locale === "en" ? "es" : "en")}
              >
                {locale.toUpperCase()}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
