import type { File, ListFilesOptions, ListFilesResult } from "@/context/types";
import path from "node:path";
import { readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { getLocalFileMetadata } from "@/lib/functions";

function getCursorValueForFile(name: string) {
  return createHash("sha256").update(name).digest("base64url");
}

export async function listFiles(
  options?: ListFilesOptions,
): Promise<ListFilesResult> {
  const { limit, cursor } = options ?? {};

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  const filesInFolder = await readdir(uploadsDir);

  const files: File[] = [];

  let filesLeft = limit ?? 50;
  let cursorFileFound = !cursor; // when no cursor, we start looping through files immediately
  for (const file of filesInFolder) {
    if (!cursorFileFound) {
      const fileHash = getCursorValueForFile(file);
      cursorFileFound = fileHash === cursor;
      continue;
    }

    const metadata = await getLocalFileMetadata(path.join(uploadsDir, file));
    files.push({ ...metadata, url: `/uploads/${encodeURIComponent(file)}` });

    if (--filesLeft === 0) {
      break;
    }
  }

  const hasMore = filesLeft === 0;

  const lastFile = files.at(-1);
  console.log(lastFile, hasMore);

  return {
    files: files,
    hasMore,
    cursor:
      hasMore && lastFile ? getCursorValueForFile(lastFile.name) : undefined,
  };
}
