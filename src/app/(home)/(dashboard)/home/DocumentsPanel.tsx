"use client"
import useBlobDetails from "@/hooks/useBlobDetails";
import { Suspense } from "react";
import FilesTable from "./FilesTable";

export default function DocumentsPanel() {
    const {  data, error, loading } = useBlobDetails();
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full border-4 border-solid border-current border-r-transparent h-24 w-24"></div>
                </div>
            }
        >
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full border-4 border-solid border-current border-r-transparent h-24 w-24"></div>
                </div>
            ) : error ? (
                <div>Error loading blobs: {error}</div>
            ) : (
                    data ? (
                      <div className="h-screen flex justify-center">
                          <FilesTable rows={data}></FilesTable>
                      </div>
                    ) : (
                        <p>No data to fetch</p>
                    )
                )
            }
        </Suspense>
    );

}