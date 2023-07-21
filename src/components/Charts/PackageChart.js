import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// third-party
import ReactApexChart from "react-apexcharts";

// material-ui
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

// constant
import { ColorPalette } from "utils/common/constant";

// chart options
const pieChartOptions = {
  chart: {
    width: "auto",
    type: "donut",
  },
  dataLabels: {
    enabled: true,
  },
  legend: { position: "bottom" },
  plotOptions: {
    pie: {
      donut: {
        size: 60,
        labels: {
          show: true,
          total: {
            show: true,
          },
        },
      },
    },
  },
};

// ==============================|| MONTHLY BAR CHART ||============================== //

const PackageChart = ({ slot }) => {
  const [options, setOptions] = useState(pieChartOptions);
  const [height, setHeight] = useState("350px");

  const theme = useTheme();
  const matchDownLg = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    setHeight(matchDownLg ? "100%" : "350px");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownLg]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      tooltip: {
        theme: "light",
      },
      labels: ["Experience", "Annual", "Family", "Custom"],
      colors: [
        ColorPalette["primary"],
        ColorPalette["secondary"],
        ColorPalette["tertiary"],
        ColorPalette["quaternary"],
        ColorPalette["quinary"],
      ],
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ColorPalette, slot]);

  const [series, setSeries] = useState([44, 55, 41, 17]);

  useEffect(() => {
    setSeries(slot === "month" ? [44, 55, 41, 17] : [45, 85, 151, 17]);
  }, [slot]);

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height={height}
      />
    </div>
  );
};

PackageChart.propTypes = {
  slot: PropTypes.string,
};

export default PackageChart;
