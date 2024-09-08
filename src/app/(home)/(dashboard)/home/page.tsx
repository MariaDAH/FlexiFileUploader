'use client';
import Carousel from './Carousel';
import DocumentsPanel from './DocumentsPanel';
import {GetBlobsByConnector} from '@/services/connector'
import { useSession } from "next-auth/react";
import {useEffect, useState } from "react";
import { Dropdown } from "@/components/ui/dropdown/dropdown";
import Loader from '@/components/ui/loader/loader';
import {File} from '@/context/interfaces/file'

export default function Home() {

    const options = [
        { key: 0 , value: "localhost" },
        { key: 1 , value: "vercel" },
    ]

    const session = useSession();
    const [strategy, setStrategy] = useState<string>('localhost');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | undefined | null>(null);
    const [data, setData] = useState<{data: { images: { image: string }[], documents: File[] } }>({data: { images: [], documents: []}});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetBlobsByConnector(strategy);
                const files = data ?? {
                    data: {
                        images: [],
                        documents: [],
                    }
                }
                setLoading(false);
                setData(files);
            } catch (error: any) {
                setError(error);
                console.error(error);
            }
        }
        fetchData();
        console.log('I got data', data);

        return () => {
            console.log('Cleanup if needed');
        };
    }, [strategy, error]);

    return (
        <>
            <main className="dark:bg-black dark:text-white">
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    <h1 className="text-6xl">{session?.data?.user?.name} uploads</h1>
                    <div className="mt-3">
                        <Dropdown
                            colorTheme="light"
                            enabled
                            id="label"
                            name="Connectors:"
                            onSelect={(e) => {
                                setStrategy(e)
                            }}
                            options={options}
                            size="large"
                        />
                    </div>
                    <section className="flex items-center">
                        {
                            loading ? (
                                <div className="flex justify-center items-center">
                                    <Loader/>
                                </div>
                            ) : error ? (
                                <p> Alert: Error loading blobs: {error?.message} </p>
                            ) : data ? (
                                <>
                                    <div className="flex flex-col">
                                        <div className="h-96 bg-blue-100 m-4">
                                            <div className="m-4">
                                                <div className="flex flex-col flex-wrap gap-1 md:flex-grow">
                                                    <div className="bg-purple-50 md:flex-grow w-full h-80">
                                                        <h1>Images</h1>
                                                        <Carousel data={data?.data.images}></Carousel>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-96 bg-blue-100 m-4">
                                            <div className="m-4">
                                                <div className="flex flex-col flex-wrap gap-1 md:flex-grow">
                                                    <div
                                                        className="bg-purple-50 md:flex-grow w-full h-80 overflow-hidden">
                                                        <h1>Documents</h1>
                                                        <div className="overflow-y-scroll">
                                                            {
                                                                data?.data?.documents ? (
                                                                    <DocumentsPanel data={data?.data.documents} />
                                                                ) : (
                                                                    <p>Alert: Info: No data fetch.</p>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex justify-center items-center h-96 bg-blue-100">
                                    <div className="bg-blue-100 p-10 text-white">
                                        <p>Alert: Info: No data fetch.</p>
                                    </div>
                                </div>
                            )
                        }
                    </section>

                </div>
            </main>
        </>
    );
}