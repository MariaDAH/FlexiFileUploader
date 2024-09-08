import {File} from '@/context/interfaces/file'
import {getArrayOfRandomColors, getCountsForEachElement, getUniqueValues } from '@/lib/functions';

interface DataProps {
    data: File[];
}

type PieChartConfig = {
    data: {
        labels: string[],
        datasets: Dataset[],
    } | any,
    options: Options
};

type Dataset = {
    label: string,
    data: any[] | null,
    backgroundColor: string[] | null,
    borderWidth: number,
    borderColor: string,
}

type Options = {
    responsive: boolean,
    maintainAspectRatio: boolean,
    plugins: {
        legend: {
            display: boolean,
            position: 'top' | 'bottom',
        }
    }
}

export const GetPieChartConfiguration = (props: DataProps): PieChartConfig => {

    const elements = props.data.map(x=> x.extension);
    const countsByElement: number[] = getCountsForEachElement(elements);
    const unique = getUniqueValues(elements);
    const colors = getArrayOfRandomColors(unique.length);

    const dataPieChart: PieChartConfig = {
        data: {
            labels: Object.keys(countsByElement),
            datasets: [
                {
                    label: "Popularity by file extension.",
                    data: Object.values(countsByElement),
                    backgroundColor: colors,
                    borderWidth: 1,
                    borderColor: '#fff',
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                }
            }
        }
    };

    return dataPieChart;
}

