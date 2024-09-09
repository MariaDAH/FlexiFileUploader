"use server";
import { put } from "@vercel/blob";
import { promises as fs } from "fs";
import { revalidatePath } from "next/cache";
import path from "path";

export async function uploadLocal(formData: FormData): Promise<void> {
  const file = formData.get("file") as File;
  const arrayBuffer = await file.arrayBuffer();

  const buffer = new Uint8Array(arrayBuffer);
  const path_ = path.join(process.cwd(), "./public/uploads/");
  const fullPath = `${path_}${file.name}`;

  console.log("Saving file in path", fullPath);

  await fs.writeFile(`${path_}${file.name}`, buffer);

  revalidatePath("/");
}

export async function uploadBlob(formData: FormData): Promise<void> {
  const image = formData.get("file") as File;
  console.log("Saving image in path", image);
  const blob = await put(image.name, image, {
    access: "public",
  });
  console.log(blob);

  revalidatePath("/");
}
