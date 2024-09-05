"use server"
import { promises as fs } from 'fs';
import { revalidatePath } from "next/cache";

export async function uploadFiles(formData: FormData) {
    const file = formData.get("file") as File;
    console.log('FORM DATA**********',file);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    await fs.writeFile(`./public/uploads/${file.name}`, buffer);

    revalidatePath("/");
}

/*export async function saveFiles(files:string[]) {
    const file = await fs.readFile(process.cwd() + '/src/utils/mock-data/files.json', 'utf8');
    const data = JSON.parse(file);
    console.log(data);

    files.forEach(async (file) => {
        let blob = await getImageFromURL(file);
    })
}*/


/*async function getImageFromURL(imageUrl: string) {

    const response =  fetch(imageUrl, {
        method: 'GET',
        headers: {}
    })

    const arrayBuffer = await response.then(
        res => res.arrayBuffer()
    )

    console.log(arrayBuffer, "arrayBuffer");

    URL.revokeObjectURL(imageUrl);

    //const blob = new Blob([arrayBuffer, { type: 'image/png' }]);

    //const file = convertBlobToFile(blob, 'image.png')

    //uploadImage(file)

    // const url = URL.createObjectURL(blob);


    function convertBlobToFile(blob, fileName){
        blob.lastModifiedDate = new Date();
        blob.name = fileName;
        return blob;
    }
}*/
