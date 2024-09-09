"use client";

import { DataTable } from "@/app/(home)/(dashboard)/home/[strategy]/data-table";
import { columns } from "@/app/(home)/(dashboard)/home/[strategy]/columns";
import PrevPageButton from "@/app/(home)/(dashboard)/home/[strategy]/prev-page-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { File, ListFilesResult } from "@/context/types";
import { useState } from "react";
import FileInspector from '@/app/(home)/(dashboard)/home/[strategy]/file-inspector';

interface FileBrowserProps {
  data: ListFilesResult;
  canGoBack?: boolean;
}

export default function FileBrowser({
  data: result,
  canGoBack,
}: FileBrowserProps) {
  const [currentFile, setCurrentFile] = useState<File>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className=" col-span-1 lg:col-span-2">
        <DataTable columns={columns} data={result.files} onSelect={(item) => setCurrentFile(item)} />
        <div className="mt-6 flex justify-between">
          <PrevPageButton disabled={!canGoBack} />
          <Button
            variant="outline"
            size="lg"
            disabled={!result.hasMore}
            asChild
          >
            <Link href={{ query: { cursor: result.cursor } }}>
              <span>Next page</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="rounded-md border p-4">
        <FileInspector file={currentFile} />
      </div>
    </div>
  );
}
