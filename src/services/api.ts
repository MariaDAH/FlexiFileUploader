import { QueryClient } from "react-query";
import { StorageContent, StorageContentSchema } from "@/context/types";

export const queryClient = new QueryClient();

export async function getUploadedFiles(
  strategy: string,
): Promise<StorageContent> {
  const response = await fetch(
    `/api/public/v1/uploads/${encodeURIComponent(strategy)}`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load content of the storage: ${response.status}`,
    );
  }

  const responseJson = await response.json();

  const parsedJson = await StorageContentSchema.parseAsync(responseJson);

  return parsedJson;
}
