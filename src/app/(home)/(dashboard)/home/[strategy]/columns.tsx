"use client";

import { ColumnDef } from "@tanstack/react-table";

import type { File } from "@/context/types";

import prettyBytes from "pretty-bytes";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export const columns: ColumnDef<File>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "size",
    header: "Size (bytes)",
    cell: ({ row }) => {
      const value = row.getValue("size");

      const formatted = typeof value === "number" ? prettyBytes(value) : "n/a";

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "uploadedAt",
    header: "Uploaded",
    cell: ({ row }) => {
      const value = row.getValue("uploadedAt");

      let date =
        value instanceof Date
          ? value
          : typeof value === "number"
            ? new Date(value)
            : null;

      if (!date) {
        return "n/a";
      }

      return new Intl.DateTimeFormat("en-GB", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(date);
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const file = row.original;

      return (
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => {
            table.resetRowSelection();
            row.toggleSelected(true);
          }}
        >
          <span className="sr-only">View file</span>
          <Eye className="h-4 w-4" />
        </Button>
      );
    },
  },
];
