"use client";
import { queryClient } from "@/services/api";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "react-query";
import React from "react";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TooltipProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TooltipProvider>
  );
}
