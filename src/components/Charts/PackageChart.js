import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// third-party
import ReactApexChart from "react-apexcharts";

// material-ui
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

// constant
import { ColorPalette } from "utils/common/constant";
import { useDispatch, useSelector } from "react-redux";
import { getAllPackages, statisticTrans } from "store/requests/package";

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

const mapSeries = (allArr, someArr) => {
  const result = allArr.map((elem) => {
    const cur = someArr.find((item) => {
      if (elem._id === item._id._id) return true;
      return false;
    });
    return cur ? cur.totalQuantity : 0;
  });

  return result;
};

const mapLabels = (allArr) => {
  const result = allArr.map((elem) => {
    return elem.name;
  });

  return result;
};

// ==============================|| MONTHLY BAR CHART ||============================== //

const PackageChart = ({ slot }) => {
  const dispatch = useDispatch();
  const { pkgByWeek, pkgByMonth, packages } = useSelector(
    (state) => state.packages
  );
  const [options, setOptions] = useState(pieChartOptions);
  const [height, setHeight] = useState("300px");
  const [listWeek, setListWeek] = useState(mapSeries(packages, pkgByWeek));
  const [listMonth, setListMonth] = useState(mapSeries(packages, pkgByMonth));
  const [labels, setLabels] = useState(mapLabels(packages));
  const [series, setSeries] = useState(listWeek);

  useEffect(() => {
    getAllPackages(dispatch);
    statisticTrans(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setListWeek(mapSeries(packages, pkgByWeek));
  }, [packages, pkgByWeek]);

  useEffect(() => {
    setListMonth(mapSeries(packages, pkgByMonth));
  }, [packages, pkgByMonth]);

  useEffect(() => {
    setLabels(mapLabels(packages));
  }, [packages]);

  useEffect(() => {
    setSeries(slot === "month" ? listMonth : listWeek);
  }, [slot]);

  const theme = useTheme();
  const matchDownLg = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    setHeight(matchDownLg ? "100%" : "300px");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownLg]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      tooltip: {
        theme: "light",
      },
      labels: labels,
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
