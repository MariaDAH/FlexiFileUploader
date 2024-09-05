"use server"
import { promises as fs } from 'fs';
import { revalidatePath } from "next/cache";
import path from 'path';

export async function uploadFiles(formData: FormData) {
    const file = formData.get("file") as File;
    //console.log('FORM DATA**********',file);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const path_ = path.join(process.cwd(), './public/uploads/');

    await fs.writeFile(`${path_}${file.name}`, buffer);

    revalidatePath("/");
}