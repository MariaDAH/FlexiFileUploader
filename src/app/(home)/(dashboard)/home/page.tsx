import {default as fsWithCallbacks} from 'fs'
import { auth } from "@/services/auth";
import Carousel from './Carousel';

export default async function Home() {
    const fs = fsWithCallbacks.promises; //Does not wotk
    const session = await auth();

    const files = await fs.readdir("./public/uploads");

    const images = files
        .filter((file:any) => file.endsWith(".JPG"))
        .map((file:any) => `/uploads/${file}`)

    const data = images.map((x) => {
        return {"image": x}
    })

    console.log('Dataaaaaaaaaaaaa', data);

    const documents = files.filter((file:any) => file.endsWith("pdf") || file.endsWith(".docx"));

    return (
         <>
             <div className="flex justify-left pt-24">
                 <main className="dark:bg-black dark:text-white">
                     <h1 className="text-6xl">{session?.user?.name} uploads</h1>
                     <div className="grid grid-cols-2 gap-4 max-h-[50%]">
                         <div className="flex flex-col justify-left bg-blue-100 p-4 m-4 h-[50%]">
                             <h1>Images</h1>
                             <div className="flex flex-col justify-center items-center h-full w-full">
                                 <Carousel data={data}></Carousel>
                             </div>
                         </div>
                         <div className="flex flex-col justify-left bg-blue-100 p-4 m-4 h-[75%]">
                             <h1>Documents</h1>
                             <div className="flex flex-1 flex-row bg-blue-300 overflow-hidden rounded-lg">
                                 <div className="flex-1 overflow-y-scroll bg-blue-50 text-black rounded-lg">
                                     {
                                         documents ? (
                                             documents.map((document, i) => {
                                                 return (
                                                     <div className="w-full" key={i}>
                                                         <p>{document}</p>
                                                     </div>
                                                 )
                                             })
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