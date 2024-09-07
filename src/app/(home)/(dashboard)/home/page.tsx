import {default as fsWithCallbacks} from 'fs'
import { auth } from "@/services/auth";
import Carousel from './Carousel';
import path from 'path';
import { list } from '@vercel/blob';
import DocumentsPanel from './DocumentsPanel';

export default async function Home() {
    const fs = fsWithCallbacks.promises; //Does not wotk
    const session = await auth();

    const blobs = await list();

    const blobImages = blobs.blobs
        .filter((file) => file.pathname.endsWith(".JPG") || file.pathname.endsWith(".jpg"))
        .map((file) => file.url)

    const path_ = path.join(process.cwd(), 'public/uploads');
    console.log('Reading file from', path_);
    const files = await fs.readdir(path_);

    const images = files
        .filter((file:any) => file.endsWith(".JPG") || file.endsWith(".jpg"))
        .map((file:any) => `/uploads/${file}`);

    const resultMerge = images.concat(blobImages);

    const data = resultMerge.map((x) => {
        return {"image": x}
    })

    //console.log('Data images', data);

    const documents = files
        .filter((file) => file.endsWith("pdf") || file.endsWith(".docx") || file.endsWith(".xlsx") || file.endsWith(".txt"));

    const blobFiles = blobs.blobs
        .filter((file) => file.pathname.endsWith(".pdf") || file.pathname.endsWith(".docx") || file.pathname.endsWith(".xlsx") || file.pathname.endsWith(".txt"))
        .map((file) => file.pathname);

    const docsMerge = documents.concat(blobFiles);

    return (
        <>
            <div className="flex justify-left pt-24">
                <main className="dark:bg-black dark:text-white">
                    <h1 className="text-6xl">{session?.user?.name} uploads</h1>
                    <div className="grid grid-cols-2 gap-4 max-h-screen">
                        <div className="flex flex-col justify-left bg-blue-100 p-4 m-4 h-[50%]">
                            <h1>Images</h1>
                            <div className="flex flex-col justify-center items-center h-full w-full">
                                <Carousel data={data}></Carousel>
                            </div>
                        </div>
                        <div className="flex flex-col justify-left bg-blue-100 p-4 m-4 h-[50%]">
                            <h1>Documents</h1>
                            <div className="flex flex-1 flex-row bg-blue-300 overflow-hidden rounded-lg">
                                <div className="flex-1 overflow-y-scroll bg-blue-50 text-black rounded-lg">
                                    {
                                        docsMerge ? (
                                            <DocumentsPanel />
                                        ) : (
                                            <p>No documents</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}