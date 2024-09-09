import { z } from "zod";

export const FileSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
  extension: z.string().optional(),
  lastModified: z.coerce.date(),
});

export const ImageFileSchema = z.object({
  url: z.string(),
});

export const StorageContentSchema = z.object({
  images: ImageFileSchema.array(),
  files: FileSchema.array(),
});

export type File = z.infer<typeof FileSchema>;
export type ImageFile = z.infer<typeof ImageFileSchema>;
export type StorageContent = z.infer<typeof StorageContentSchema>;
