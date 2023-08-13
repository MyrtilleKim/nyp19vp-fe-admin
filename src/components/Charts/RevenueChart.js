import PropTypes from "prop-types";
import { useState, useEffect } from "react";

// third-party
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { statisticTrans } from "store/requests/package";

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
  const dispatch = useDispatch();
  const { revenueByWeek, revenueByMonth } = useSelector(
    (state) => state.packages
  );
  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    statisticTrans(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [ColorPalette["primary"]],
      xaxis: {
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
    { name: "VND", data: revenueByWeek.data },
  ]);

  useEffect(() => {
    setSeries([
      {
        name: "VND",
        data: slot === "month" ? revenueByMonth.data : revenueByWeek.data,
      },
    ]);
  }, [slot]);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height="300px"
    />
  );
};

RevenueChart.propTypes = {
  slot: PropTypes.string,
};

export default RevenueChart;
