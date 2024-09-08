"use client"
import FilesTable from "./FilesTable";
import Loader from "@/components/ui/loader/loader";
import {useEffect, useState } from "react";
import {File} from "@/context/interfaces/file"

export default function DocumentsPanel( {data}: { data: File[] } ) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        if (data) {
            setLoading(false);
        } else {
            setError(error);
            setLoading(false);
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
                         data.length > 0 ? (
                            <div className="h-screen flex justify-center">
                                <FilesTable rows={data.map(x => x)}></FilesTable>
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