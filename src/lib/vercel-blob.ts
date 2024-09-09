import type {Analytics, File, ListFilesOptions, ListFilesResult} from '@/context/types';
import { list, ListBlobResultBlob } from "@vercel/blob";

interface Summary {
  size: number;
  count: number;
}

export async function listFiles(
  options?: ListFilesOptions,
): Promise<ListFilesResult> {
  const { limit, cursor } = options ?? {};

  const blobs = await list({ cursor, limit });

  const rest: File[] = [];
  for (let blob of blobs.blobs) {
    rest.push({
      name: blob.pathname,
      extension: blob.pathname.split(".").at(-1) ?? "",
      type: "",
      size: blob.size,
      uploadedAt: blob.uploadedAt,
      url: blob.url,
    });
  }

  return {
    hasMore: blobs.hasMore,
    cursor: blobs.cursor,
    files: rest,
  };
}

export async function analyse(): Promise<Analytics> {
  const volumeByDate = new Map<string, number>();
  const summaryByExtension = new Map<string, Summary>();

  let hasMore = true;
  let cursor: string | undefined;

  while (hasMore) {
    const listResult = await list({
      cursor,
    });
    hasMore = listResult.hasMore;
    cursor = listResult.cursor;

    calculateVolumeByDate(volumeByDate, listResult.blobs);
    calculateByExtension(summaryByExtension, listResult.blobs);
  }

  return {
    volumeByDate: Array.from(volumeByDate.entries()).map(([date, volume]) => ({
      date,
      volume,
    })),
    summaryByExtension: Array.from(summaryByExtension.entries()).map(
      ([extension, data]) => ({ ...data, extension }),
    ),
  };
}

function calculateVolumeByDate(
  buckets: Map<string, number>,
  items: ListBlobResultBlob[],
): void {
  for (const { uploadedAt, size } of items) {
    const date = uploadedAt.toISOString().substring(0, 10);
    const currentSize = buckets.get(date) ?? 0;
    buckets.set(date, currentSize + size);
  }
}

function calculateByExtension(
  buckets: Map<string, Summary>,
  items: ListBlobResultBlob[],
): void {
  for (const { pathname, size } of items) {
    const ext = pathname.split(".").pop() ?? "";

    const current = buckets.get(ext) ?? { size: 0, count: 0 };
    buckets.set(ext, { size: current.size + size, count: current.count + 1 });
  }
}
