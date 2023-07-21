import PropTypes from "prop-types";
import { useState, useEffect } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

// third-party
import ReactApexChart from "react-apexcharts";

// constant
import { ColorPalette } from "utils/common/constant";

// chart options
const areaChartOptions = {
  chart: {
    type: "area",
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  grid: {
    strokeDashArray: 0,
  },
};
const line = "#fcddb3";
// ==============================|| INCOME AREA CHART ||============================== //

const RevenueChart = ({ slot }) => {
  const theme = useTheme();
  const matchUpXl = useMediaQuery(theme.breakpoints.up("xl"));
  const [options, setOptions] = useState(areaChartOptions);
  const [height, setHeight] = useState("300px");
  useEffect(() => {
    setHeight(matchUpXl ? "600px" : "300px");
  }, [matchUpXl]);
  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [ColorPalette["primary"]],
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
        axisBorder: {
          show: true,
          color: line,
        },
        tickAmount: slot === "month" ? 11 : 7,
      },
      yaxis: {
        labels: {
          style: {
            colors: [ColorPalette["quinary"]],
          },
        },
      },
      grid: {
        borderColor: line,
      },
      tooltip: {
        theme: "light",
      },
    }));
  }, [slot]);

  const [series, setSeries] = useState([
    {
      name: "VND",
      data: [0, 86, 28, 115, 48, 210, 136],
    },
  ]);

  useEffect(() => {
    setSeries([
      {
        name: "VND",
        data:
          slot === "month"
            ? [76, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 35]
            : [31, 40, 28, 51, 42, 109, 100],
      },
    ]);
  }, [slot]);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={height}
    />
  );
};

RevenueChart.propTypes = {
  slot: PropTypes.string,
};

export default RevenueChart;
