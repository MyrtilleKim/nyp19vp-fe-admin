import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// third-party
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { MonthlyLabels, statisticTrans } from "store/requests/package";

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
  const dispatch = useDispatch();
  const { txnByMonth, txnByWeek } = useSelector((state) => state.packages);
  const [options, setOptions] = useState(barChartOptions);

  useEffect(() => {
    statisticTrans(dispatch);
  }, [dispatch]);

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
      name: "Giao dịch",
      data: txnByWeek.data,
    },
  ]);

  useEffect(() => {
    setSeries([
      {
        name: "Giao dịch",
        data: slot === "month" ? txnByMonth.data : txnByWeek.data,
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
