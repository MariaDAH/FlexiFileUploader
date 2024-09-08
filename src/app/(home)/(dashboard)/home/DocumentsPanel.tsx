"use client"
import FilesTable from "./FilesTable";
import {File} from "@/context/interfaces/file"

export default function DocumentsPanel( {data}: { data: File[] } ) {

    return (
        <>
            <section className="flex items-center">
                {
                     data.length > 0 ? (
                        <div className="h-screen flex justify-center">
                            <FilesTable rows={data.map(x => x)}></FilesTable>
                        </div>
                        ) : (
                             <p>Alert: Info: No data fetch.</p>
                        )
                }
            </section>
        </>
    );
}