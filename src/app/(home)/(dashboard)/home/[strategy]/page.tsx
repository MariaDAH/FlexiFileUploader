import type { ListFilesResult } from "@/context/types";
import { listFiles as listVercelFiles } from "@/lib/vercel-blob";
import { listFiles as listLocalFiles } from "@/lib/local-fs";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PageHeader from "@/components/page-header";
import PrevPageButton from "./prev-page-button";
import { ChevronRight } from "lucide-react";
import FileBrowser from '@/app/(home)/(dashboard)/home/[strategy]/file-browser';

type PageParams = {
  strategy: string;
};

type PageSearchParams = {
  cursor: string;
};

export default async function StrategyHomePage({
  params: { strategy },
  searchParams: { cursor },
}: {
  params: PageParams;
  searchParams: Partial<PageSearchParams>;
}) {
  let result: ListFilesResult;

  if (strategy === "vercel") {
    result = await listVercelFiles({ cursor, limit: 10 });
  } else if (strategy === "localhost") {
    result = await listLocalFiles({ cursor, limit: 10 });
  } else {
    return "Unsupported backend";
  }

  return (
    <div className="flex flex-col gap-y-6">
      <PageHeader
        title="File Browser"
        description={`Files in your ${strategy} backend`}
      />
      <main>
        <FileBrowser data={result} canGoBack={!!cursor} />
      </main>
    </div>
  );
}
