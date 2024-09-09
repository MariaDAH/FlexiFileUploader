"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PrevPageButtonProps {
  disabled: boolean;
}

export default function PrevPageButton({ disabled }: PrevPageButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="lg"
      disabled={disabled}
      onClick={() => router.back()}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>Prev page</span>
    </Button>
  );
}
