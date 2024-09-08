"use client";
import {Line, Pie} from "react-chartjs-2";
import {ArcElement, CategoryScale, Chart, Chart as ChartJS, LinearScale, LineElement, PointElement, Tooltip,} from "chart.js";
import useBlobDetails from "@/hooks/useBlobDetails";
import { GetPieChartConfiguration } from "./pie-chart-config";
import { GetLineChartConfiguration } from "./line-chart-config";
import Loader from "@/components/ui/loader/loader";
import {useEffect, useState } from "react";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    ArcElement
);

export default function Analytics() {

    const {data, error, loading} = useBlobDetails();
    //const {data, error, loading} = { data: null, error: {message: "No data"}, loading: false}; /*** For testing ***/
    const dataset = data ?? [];

    const dataPieChart = GetPieChartConfiguration({data: dataset}) ?? { data: [], option: {} };
    const dataLineChart = GetLineChartConfiguration({data: dataset}) ?? { data: [], option: {} };

    return (
        <>
            <main className="dark:bg-black dark:text-white">
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 flex-1 min-w-full">
                    <h1 className="text-4xl pt-10">Analytics</h1>
                    <section className="flex items-center">
                        {
                            loading ? (
                                <div className="flex justify-center items-center">
                                    <Loader/>
                                </div>
                        ) : error ? (
                            <p>Alert: Error loading blobs: {error?.message} </p>
                        ) : data ?  (
                            <div className="flex flex-col">
                                <div className="h-96 flex flex-wrap bg-blue-100 p-4 m-4 gap-4">
                                    <div className="flex-1 p-4 bg-purple-50">
                                        <Pie data={dataPieChart.data} options={dataPieChart.options}/>
                                    </div>
                                    <div className="flex-1 p-4 bg-purple-50">
                                        <Pie data={dataPieChart.data} options={dataPieChart.options}/>
                                    </div>
                                </div>
                                <div className="h-96 bg-blue-100 m-4">
                                    <div className="m-4">
                                        <div className="flex flex-col flex-wrap gap-1 md:flex-grow">
                                            <div className="bg-purple-50 md:flex-grow w-full h-80">
                                                <Line data={dataLineChart.data} options={dataLineChart.options}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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