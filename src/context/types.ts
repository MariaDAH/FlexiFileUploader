import { z } from "zod";

export const FileSchema = z.object({
  name: z.string(),
  extension: z.string().optional(),
  size: z.number(),
  uploadedAt: z.coerce.date(),
  type: z.string(),
  url: z.string().optional(),
});

export const ImageFileSchema = z.object({
  url: z.string(),
});

export const StorageContentSchema = z.object({
  images: ImageFileSchema.array(),
  files: FileSchema.array(),
});

export const AnalyticsSchema = z.object({
  volumeByDate: z
    .object({
      date: z.string().date(),
      volume: z.number(),
    })
    .array(),
  summaryByExtension: z
    .object({
      extension: z.string(),
      size: z.number(),
      count: z.number(),
    })
    .array(),
});

export type File = z.infer<typeof FileSchema>;
export type ImageFile = z.infer<typeof ImageFileSchema>;
export type StorageContent = z.infer<typeof StorageContentSchema>;
export type Analytics = z.infer<typeof AnalyticsSchema>;

export interface ListFilesOptions {
  limit?: number;
  cursor?: string;
}

export interface ListFilesResult {
  hasMore: boolean;
  cursor?: string;
  files: File[];
}
