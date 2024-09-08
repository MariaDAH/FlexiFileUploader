"use client"
import FilesTable from "./FilesTable";
import Loader from "@/components/ui/loader/loader";
import {useEffect, useState } from "react";
import {File} from "@/context/interfaces/file"

export default function DocumentsPanel( {data}: { data: File[] } ) {

    const [documents, setDocuments] = useState<File[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        if (data) {
            setLoading(false);
            setDocuments(data);
        };

        if (error) {
            setError(error);
        }
    }, [data, error]);

    return (
        <>
            <section className="flex items-center">
                {
                    loading ? (
                        <div className="flex justify-center items-center">
                            <Loader/>
                        </div>
                    ) : error ? (
                        <div>Error loading blobs: {error?.message}</div>
                    ) : (
                        documents ? (
                            <div className="h-screen flex justify-center">
                                <FilesTable rows={documents}></FilesTable>
                            </div>
                        ) : (
                            <p>Alert: Info: No data fetch.</p>
                        )
                    )
                }
            </section>
        </>
    );
}