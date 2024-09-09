import { File } from "@/context/types";

interface DataProps {
  data: File[];
}

type LineCharConfig = {
  data: {
    labels: string[];
    datasets: Dataset[];
  };
  options: Options | any;
};

type Dataset = {
  label: string;
  data: any[] | null;
  borderColor: string;
  borderWidth: number;
  pointRadius: number;
};

type Options = {
  responsive: boolean;
  maintainAspectRatio: boolean;
  plugins: {
    legend: {
      position: string;
    };
    tooltip: {
      callbacks: {
        label: (context: any) => any;
      };
    };
  };
  title: {
    display: boolean;
    text: string;
    font: {
      size: number;
      weight: "bold";
    };
    padding: {
      top: number;
      bottom: number;
    };
  };
  scales: {
    x: {
      title: {
        display: boolean;
        text: string;
      };
    };
    y: {
      title: {
        display: boolean;
        text: string;
      };
    };
  };
};

export const GetLineChartConfiguration = (props: DataProps): LineCharConfig => {
  const dataLineChart = {
    data: {
      labels: props.data.map((entry: File) =>
        new Date(entry.lastModified).toLocaleDateString(),
      ),
      datasets: [
        {
          label: "Sizes (bytes)",
          data: props.data.map((entry: File) => entry.size.toFixed(2)),
          borderColor: "orange",
          borderWidth: 2,
          pointRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (context: any) {
              let label = context.dataset.label || "";
              if (context.parsed.y !== null) {
                label += ": " + context.parsed.y;
              }
              return label;
            },
          },
        },
        title: {
          display: true,
          text: "Daily updates",
          font: {
            size: 20,
            weight: "bold",
          },
          padding: {
            top: 10,
            bottom: 30,
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Datetime",
          },
        },
        y: {
          title: {
            display: true,
            text: "File bytes.",
          },
        },
      },
    },
  };

  return dataLineChart;
};
