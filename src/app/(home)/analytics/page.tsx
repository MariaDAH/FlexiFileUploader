"use client";
import useBlobDetails from "@/hooks/useBlobDetails";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
    LineProps,
} from "chart.js";
import { File } from '@/context/interfaces/file'
import ExtensionsPieChart from "./ExtensionsPieChart";
import { Line } from "react-chartjs-2";
import {getArrayOfRandomColors, getCountsForEachElement, getUniqueValues } from "@/lib/functions";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
);

export default function Analytics() {
    const {data, error, loading } = useBlobDetails();

    if (!data || !data.length) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full border-4 border-solid border-current border-r-transparent h-12 w-12"></div>
            </div>
        );
    }

    //console.log(data[0].lastModified);

    const dataLineChart = {
        labels: data.map((entry: File) => new Date(entry.lastModified).toLocaleDateString()),
        datasets: [
            {
                label: "Sizes (bytes)",
                data: data.map((entry: File) => entry.size.toFixed(2)),
                borderColor: "orange",
                borderWidth: 2,
                pointRadius: 4,
            },
        ],
    };

    const elements = data.map(x=> x.extension);
    const countsByElement = getCountsForEachElement(elements);
    const unique = getUniqueValues(elements);
    const colors = getArrayOfRandomColors(unique.length);
    console.log(unique.length);
    const dataPieChart: any = {
        labels: Object.keys(countsByElement),
        datasets: [
            {
                label: "Popularity by file extension.",
                data: Object.values(countsByElement),
                backgroundColor: colors,
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <div className="flex justify-center pt-28">
                <main className="dark:bg-black dark:text-white">
                    <h1 className="text-4xl">Analytics page</h1>
                    <div>
                        <Line data={dataLineChart}/>
                    </div>
                    <div>
                        <ExtensionsPieChart data={dataPieChart}/>
                    </div>
                </main>
            </div>
        </>
    );
}