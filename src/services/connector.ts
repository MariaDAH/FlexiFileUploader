"use server";
import { list } from "@vercel/blob";
import { default as fsWithCallbacks } from "fs";
import path from "path-browserify";
import { File } from "@/context/types";
import { getStatsForDirectoryFile } from "@/lib/functions";

export const GetBlobsByConnector = async (connector: string) => {
  switch (connector) {
    case "localhost": {
      const fs = fsWithCallbacks.promises;
      const path_ = path.join(process.cwd(), "public/uploads");
      const files = await fs.readdir(path_);
      const images = files
        .filter((file: any) => file.endsWith(".JPG") || file.endsWith(".jpg"))
        .map((file: any) => `/uploads/${file}`)
        .map((x) => {
          return { image: x };
        });
      const documents = files.filter(
        (file) =>
          file.endsWith("pdf") ||
          file.endsWith(".docx") ||
          file.endsWith(".xlsx") ||
          file.endsWith(".txt"),
      );
      const documentDetails = getStatsForDirectoryFile(documents, path_);
      return {
        data: {
          images: images ?? [],
          documents: documentDetails ?? [],
        },
      };
    }
    case "vercel": {
      const blobs = await list();
      const blobImages = blobs.blobs
        .filter(
          (file) =>
            file.pathname.endsWith(".JPG") || file.pathname.endsWith(".jpg"),
        )
        .map((file) => file.url)
        .map((image) => {
          return {
            image: image,
          };
        });
      const blobFiles = blobs.blobs
        .filter(
          (file) =>
            file.pathname.endsWith(".pdf") ||
            file.pathname.endsWith(".docx") ||
            file.pathname.endsWith(".xlsx") ||
            file.pathname.endsWith(".txt"),
        )
        .map((file) => {
          return <File>{
            name: file.pathname ?? "",
            size: file?.size ?? 0,
            type: "",
            extension: file.pathname.split(".").pop() ?? "",
            lastModified: file.uploadedAt,
          };
        });
      return {
        data: {
          images: blobImages ?? [],
          documents: blobFiles ?? [],
        },
      };
    }
    case "default": {
      return {
        data: {
          images: [],
          documents: [],
        },
      };
    }
  }
};
