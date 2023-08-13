import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// bootstrap
import { Row, Col, Container } from "react-bootstrap";

// project
import CounterWidget from "components/Widgets/CounterWidget";
import RevenueWidget from "components/Widgets/RevenueWidget";
import TransactionWidget from "components/Widgets/TransactionWidget";
import PackageWidget from "components/Widgets/PackageWidget";

// assets
import {
  faUserCheck,
  faChartSimple,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";

// data
import {
  formatCurrency,
  formatShortDate,
  statistic,
} from "store/requests/user";
import { statisticTrans } from "store/requests/package";
import { reinitializeState } from "store/reducers/package";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { count, period, ratio } = useSelector((state) => state.user);
  const statisticTxn = useSelector((state) => state.packages);
  // dispatch(reinitializeState());
  useEffect(() => {
    statistic(dispatch);
    statisticTrans(dispatch);
  }, [dispatch]);
  return (
    <>
      <Container>
        <Row className="justify-content-md-center mt-0">
          <Col xs={12} className="mb-4 d-sm-block">
            <RevenueWidget
              title="Doanh thu"
              value={{
                week: formatCurrency(statisticTxn.revenueByWeek.value),
                month: formatCurrency(statisticTxn.revenueByMonth.value),
              }}
              percentage={{
                week: statisticTxn.ratio.weeklyRevenue,
                month: statisticTxn.ratio.monthlyRevenue,
              }}
            />
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-0">
          <Col xs={12} sm={6} xl={4} className="mb-4">
            <CounterWidget
              category="Người dùng"
              title={count}
              period={period}
              percentage={ratio?.portion}
              icon={faUserCheck}
              iconColor="secondary"
            />
          </Col>
          <Col xs={12} sm={6} xl={4} className="mb-4">
            <CounterWidget
              category="Doanh thu"
              title={formatCurrency(statisticTxn.totalRevenue)}
              period={{
                min: formatShortDate(statisticTxn.period.min),
                max: formatShortDate(statisticTxn.period.max),
              }}
              percentage={statisticTxn.ratio.monthlyRevenue}
              icon={faChartSimple}
              iconColor="tertiary"
            />
          </Col>
          <Col xs={12} sm={6} xl={4} className="mb-4">
            <CounterWidget
              category="Giao dịch"
              title={statisticTxn.countTxn}
              period={{
                min: formatShortDate(statisticTxn.period.min),
                max: formatShortDate(statisticTxn.period.max),
              }}
              percentage={statisticTxn.ratio.monthlyTxn}
              icon={faMoneyBillTransfer}
              iconColor="quaternary"
            />
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-0">
          <Col xs={12} lg={7} className="mb-4 d-sm-block">
            <TransactionWidget
              title="Giao dịch"
              value={{
                week: statisticTxn.txnByWeek.value,
                month: statisticTxn.txnByMonth.value,
              }}
              percentage={{
                week: statisticTxn.ratio.weeklyTxn,
                month: statisticTxn.ratio.monthlyTxn,
              }}
            />
          </Col>
          <Col xs={12} lg={5} className="mb-4 d-sm-block">
            <PackageWidget
              title="Số lượng gói đã bán"
              value={statisticTxn.countPkg}
              percentage={-7}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
