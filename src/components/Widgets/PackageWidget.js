import React, { forwardRef, useState } from "react";

// bootstrap
import { Card, Button } from "react-bootstrap";

// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

// project
import PackageChart from "components/Charts/PackageChart";

const PackageWidget = forwardRef((props, ref) => {
  const { title, value, percentage } = props;
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";
  const curPercentage = percentage < 0 ? percentage * -1 : percentage;

  const [slot, setSlot] = useState("week");

  return (
    <Card ref={ref} border="light" className="shadow-sm">
      <Card.Body>
        <div className="d-flex flex-row align-items-center flex-0 bg-none">
          <div className="d-block ms-3">
            <h5 className="fw-normal mb-2">{title}</h5>
            <h3>{value}</h3>
            <small className="fw-bold mt-2">
              <span className="me-2">
                {slot === "week" ? "Hôm qua" : "Tháng trước"}
              </span>
              <FontAwesomeIcon
                icon={percentageIcon}
                className={`${percentageColor} me-1`}
              />
              <span className={percentageColor}>{curPercentage}%</span>
            </small>
          </div>
          <div className="d-flex ms-auto me-3">
            <Button
              variant={slot === "week" ? "primary" : "outline-primary"}
              size="sm"
              className={
                slot === "week" ? "me-3 rounded" : "me-3 rounded btn-pressed"
              }
              style={{ width: "4rem" }}
              onClick={() => setSlot("week")}
            >
              Tuần
            </Button>
            <Button
              variant={slot === "month" ? "primary" : "outline-primary"}
              size="sm"
              className={
                slot === "month" ? "me-2 rounded" : "me-2 rounded btn-pressed"
              }
              style={{ width: "4rem" }}
              onClick={() => setSlot("month")}
            >
              Tháng
            </Button>
          </div>
        </div>
        <div className="m-0 my-4">
          <PackageChart slot={slot} />
        </div>
      </Card.Body>
    </Card>
  );
});

export default PackageWidget;
