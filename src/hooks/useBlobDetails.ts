import React, { useState, useEffect } from "react";
import { File } from   "@/context/interfaces/file"

const useBlobDetails = () => {

    const [data, setBlobs] = useState<File[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchBlobs() {
            try {
                const response = await fetch('/api/public/v1/uploads');
                const data = await response.json();
                const files = data.map((blob: any) => {
                    const file: File = {
                        name: blob.pathname ?? '',
                        size: blob?.size ?? 0,
                        type: '',
                        extension: blob.pathname.split('.').pop() ?? '',
                        lastModified: blob.uploadedAt
                    };
                    return file;
                });
                setBlobs(files);
                setLoading(false);
            } catch (error: any) {
                console.error('Error fetching blobs:', error);
                setError(error);
                setLoading(false);
            }
        }

        fetchBlobs();
    }, []);



    return { data, loading, error };
};

export default useBlobDetails;

async function ReturnMimeByExt(extension: string): Promise<string> {
    switch (extension) {
        case "jpg":
            return MimeTypes.jpg;
        case "docx":
            return MimeTypes.docx;
        case "xlsx":
            return MimeTypes.xlsx
        default:
            return "";
    }
}

function setData(arg0: null) {
    throw new Error("Function not implemented.");
}
