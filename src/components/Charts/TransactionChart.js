import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// third-party
import ReactApexChart from "react-apexcharts";

// constant
import { ColorPalette } from "utils/common/constant";

// chart options
const barChartOptions = {
  chart: {
    type: "bar",
    height: 300,
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
    colors: [ColorPalette["quinary"]],
  },
  grid: {
    show: true,
  },
};

// ==============================|| MONTHLY BAR CHART ||============================== //

const TransactionChart = ({ slot }) => {
  const [options, setOptions] = useState(barChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      plotOptions: {
        bar: {
          columnWidth: slot === "month" ? "45%" : "30%",
          borderRadius: 4,
        },
      },
      colors: [ColorPalette["quaternary"]],
      xaxis: {
        categories:
          slot === "month"
            ? [
                "T1",
                "T2",
                "T3",
                "T4",
                "T5",
                "T6",
                "T7",
                "T8",
                "T9",
                "T10",
                "T11",
                "T12",
              ]
            : ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
        labels: {
          style: {
            colors: [
              ColorPalette["quinary"],
              ColorPalette["quinary"],
              ColorPalette["quinary"],
              ColorPalette["quinary"],
              ColorPalette["quinary"],
              ColorPalette["quinary"],
              ColorPalette["quinary"],
              ColorPalette["quinary"],
              ColorPalette["quinary"],
              ColorPalette["quinary"],
              ColorPalette["quinary"],
              ColorPalette["quinary"],
            ],
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: [ColorPalette["quinary"]],
          },
        },
      },
      tooltip: {
        theme: "light",
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ColorPalette, slot]);

  const [series, setSeries] = useState([
    {
      data: [80, 95, 70, 42, 65, 55, 78],
    },
  ]);

  useEffect(() => {
    setSeries([
      {
        data:
          slot === "month"
            ? [76, 85, 101, 98, 87, 50, 91, 60, 45, 86, 45, 35]
            : [31, 40, 28, 51, 42, 45, 70],
      },
    ]);
  }, [slot]);

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={"300px"}
      />
    </div>
  );
};

TransactionChart.propTypes = {
  slot: PropTypes.string,
};

export default TransactionChart;
