import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
    data: {
        labels: string[];
        datasets: [
            {
                label: string,
                data: any[],
                backgroundColor: string[],
                borderWidth: number,
            },
        ],
    }
}

const ExtensionsPieChart = (props: Props) => {
    const data = {
        labels: props.data.labels,
        datasets: [
            {
                label:'Upload popularity by extension',
                data: props.data.datasets[0].data,
                backgroundColor: props.data.datasets[0].backgroundColor,
                borderWidth: 1,
            },
        ],
    };

    return (
        <Pie data={data} />
    )
}

export default ExtensionsPieChart
