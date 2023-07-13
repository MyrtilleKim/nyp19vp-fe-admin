import React from "react";

// bootstrap
import { Row, Col } from "react-bootstrap";

// project
import CounterWidget from "components/Widgets/CounterWidget";
import RevenueWidget from "components/Widgets/RevenueWidget";
import TransactionWidget from "components/Widgets/TransactionWidget";
import PackageWidget from "components/Widgets/PackageWidget";

//assets
import {
  faUserCheck,
  faChartSimple,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  return (
    <>
      <Row className="justify-content-md-center mt-0">
        <Col xs={12} className="mb-4 d-sm-block">
          <RevenueWidget title="Doanh thu" value="10.256K" percentage={-5.6} />
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-0">
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Người dùng"
            title="345k"
            period="Feb 1 - Apr 1"
            percentage={18.2}
            icon={faUserCheck}
            iconColor="secondary"
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Doanh thu"
            title="$43,594"
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faChartSimple}
            iconColor="tertiary"
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Giao dịch"
            title="345k"
            period="Feb 1 - Apr 1"
            percentage={-18.2}
            icon={faMoneyBillTransfer}
            iconColor="quaternary"
          />
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-0">
        <Col xs={12} lg={7} className="mb-4 d-sm-block">
          <TransactionWidget title="Giao dịch" value="800" percentage={8.6} />
        </Col>
        <Col xs={12} lg={5} className="mb-4 d-sm-block">
          <PackageWidget title="Giao dịch" value="50" percentage={8.6} />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
