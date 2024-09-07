"use client"

import { Button } from "@/components/ui/button/button";
import {uploadBlob, uploadLocal } from "@/context/data/actions";
import { useState } from "react";
import { Modal } from "./modal";


export default function Uploader() {
    const [file, setFile] = useState<string>();
    const [data, setData] = useState<any>();
    const [fileEnter, setFileEnter] = useState(false);
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="flex justify-center pt-28">
                <main className="dark:bg-black dark:text-white">
                    <h1 className="text-4xl">Uploader page</h1>
                    <div className="grow h-14 mt-10">
                        {!file ? (
                            <div
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setFileEnter(true);
                                }}
                                onDragLeave={(e) => {
                                    setFileEnter(false);
                                }}
                                onDragEnd={(e) => {
                                    e.preventDefault();
                                    setFileEnter(false);
                                }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setFileEnter(false);
                                    if (e.dataTransfer.items) {
                                        [...e.dataTransfer.items].forEach((item, i) => {
                                            if (item.kind === "file") {
                                                const file = item.getAsFile();
                                                if (file) {
                                                    let blobUrl = URL.createObjectURL(file);
                                                    setData(file);
                                                    setFile(blobUrl);
                                                    //console.log('Data type single', data.type);
                                                }
                                            }
                                        });
                                    } else {
                                        [...e.dataTransfer.files].forEach((file, i) => {
                                            console.log(`… file[${i}].name = ${file.name}`);
                                        });
                                    }
                                }}
                                className={`${
                                    fileEnter ? "border-4" : "border-2"
                                } mx-auto  bg-white flex flex-col w-full max-w-xs h-72 border-dashed items-center justify-center`}
                            >
                                <label
                                    htmlFor="file"
                                    className="h-full flex flex-col justify-center text-center"
                                >
                                    Click to upload or drag and drop
                                </label>
                                <input
                                    id="file"
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => {
                                        console.log(e.target.files);
                                        let files = e.target.files;
                                        if (files && files[0]) {
                                            let blobUrl = URL.createObjectURL(files[0]);
                                            setFile(blobUrl);
                                            setData(files[0]);
                                            //console.log('Data type', data.type);
                                        }
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                {
                                    data.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ?
                                        (
                                             <object className="rounded-md w-full max-w-lg h-72"
                                                     data={file}
                                                    type={data.type}/>

                                        ): (
                                            <iframe className="flex flex-col items-center bg-transparent"
                                                    src={data.url}
                                                    title={data.name}
                                            />
                                        )
                                }
                                <div className="flex flex-row items-center mt-10">
                                    <div className="p-2">
                                        <Button size="large" label="Reset" type="reset" primary onClick={() => setFile("")} />
                                    </div>
                                    <div className="p-2">
                                        <form
                                            action={async () => {
                                                const formData = new FormData();
                                                formData.set('file', data);
                                                await uploadBlob(formData);
                                                setShowModal(!showModal);
                                            }}
                                        >
                                            <Button size="large" label="Upload" type="submit" primary/>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {
                        showModal && <Modal action={setShowModal} nameFile={data?.name} />
                    }
                </main>
            </div>
        </>
    );
}