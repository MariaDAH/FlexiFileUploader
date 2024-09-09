import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/services/auth";
import { list } from "@vercel/blob";
import { getLocalFileMetadata } from "@/lib/functions";
import type { File, ImageFile, StorageContent } from "@/context/types";
import { readdir } from "fs/promises";
import * as path from "path";

type Params = {
  strategy: string;
};

export async function GET(req: NextRequest, context: { params: Params }) {
  const session = await auth();

  if (!session?.user) {
    return new NextResponse(`You are not authenticated!`, { status: 401 });
  }

  try {
    switch (context.params.strategy) {
      case "localhost":
        return NextResponse.json(await listLocalFiles());
      case "vercel":
        return NextResponse.json(await listRemoteFiles());
    }

    return NextResponse.json(
      {
        error: "Unsupported strategy",
      },
      { status: 400 },
    );
  } catch (e) {
    return NextResponse.json(
      {
        error:
          e instanceof Error
            ? e.message
            : "Unknown error experienced when retrieving files",
      },
      {
        status: 500,
      },
    );
  }
}

async function listLocalFiles(): Promise<StorageContent> {
  const path_ = path.join(process.cwd(), "public", "uploads");
  const files = await readdir(path_);

  const images: ImageFile[] = [];
  const rest: File[] = [];
  for (const file of files) {
    if (file.match(/\.(jpe?g|png|gif|webm)$/i)) {
      images.push({ url: `/uploads/${encodeURIComponent(file)}` });
      continue;
    }

    const metadata = await getLocalFileMetadata(path.join(path_, file));
    rest.push(metadata);
  }

  return {
    images: images,
    files: rest,
  };
}

async function listRemoteFiles(): Promise<StorageContent> {
  const blobs = await list();

  const images: ImageFile[] = [];
  const rest: File[] = [];
  for (let blob of blobs.blobs) {
    if (blob.pathname.match(/\.(jpe?g|png|gif|webm)$/i)) {
      images.push({ url: blob.url });
      continue;
    }

    rest.push({
      name: blob.pathname,
      extension: blob.pathname.split(".").at(-1) ?? "",
      type: "",
      size: blob.size,
      uploadedAt: blob.uploadedAt,
    });
  }

  return {
    images: images,
    files: rest,
  };
}
