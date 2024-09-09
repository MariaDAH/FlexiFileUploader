import { File } from "@/context/interfaces/file";
import {
  getArrayOfRandomColors,
  getCountsForEachElement,
  getMaxSizesByElement,
  getUniqueValues,
} from "@/lib/functions";

interface DataProps {
  data: File[];
}

type BarChartConfig = {
  data:
    | {
        labels: string[];
        datasets: Dataset[];
      }
    | any;
  options: Options;
};

type Dataset = {
  label: string;
  data: any[] | null;
  backgroundColor: string[] | null;
  borderWidth: number;
  borderColor: string;
};

type Options = {
  responsive: boolean;
  plugins: {
    legend: {
      display: boolean;
      position: "top" | "bottom";
    };
  };
  scales: {
    x: {
      beginAtZero: boolean;
    };
    y: {
      beginAtZero: boolean;
    };
  };
};

export const GetBarChartConfiguration = (props: DataProps): BarChartConfig => {
  //Sum(size) x Extension
  const elements = props.data.map((x) => x.extension);
  const maxSizeByElement: number[] = getMaxSizesByElement(props.data);
  const unique = getUniqueValues(elements);
  const colors = getArrayOfRandomColors(unique.length);

  const dataPieChart: BarChartConfig = {
    data: {
      labels: Object.keys(maxSizeByElement),
      datasets: [
        {
          label: "Largest volumes.",
          data: Object.values(maxSizeByElement),
          backgroundColor: colors,
          borderWidth: 1,
          borderColor: "#fff",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  return dataPieChart;
};
