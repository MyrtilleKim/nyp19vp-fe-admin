import React, { forwardRef, useEffect, useState } from "react";

// bootstrap
import { Card, Button } from "react-bootstrap";

// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

// project
import TransactionChart from "components/Charts/TransactionChart";

const TransactionWidget = forwardRef((props, ref) => {
  const { title, value, percentage } = props;
  const [slot, setSlot] = useState("week");
  // const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  // const percentageColor = percentage < 0 ? "text-danger" : "text-success";
  // const curPercentage = percentage < 0 ? percentage * -1 : percentage;

  const [portion, setPortion] = useState(
    slot === "week"
      ? {
          icon: percentage.week < 0 ? faAngleDown : faAngleUp,
          color: percentage.week < 0 ? "text-danger" : "text-success",
          current: percentage.week < 0 ? percentage.week * -1 : percentage.week,
        }
      : {
          icon: percentage.month < 0 ? faAngleDown : faAngleUp,
          color: percentage.month < 0 ? "text-danger" : "text-success",
          current:
            percentage.month < 0 ? percentage.month * -1 : percentage.month,
        }
  );

  useEffect(() => {
    if (slot === "week") {
      setPortion({
        icon: percentage.week < 0 ? faAngleDown : faAngleUp,
        color: percentage.week < 0 ? "text-danger" : "text-success",
        current: percentage.week < 0 ? percentage.week * -1 : percentage.week,
      });
    } else {
      setPortion({
        icon: percentage.month < 0 ? faAngleDown : faAngleUp,
        color: percentage.month < 0 ? "text-danger" : "text-success",
        current:
          percentage.month < 0 ? percentage.month * -1 : percentage.month,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slot]);

  return (
    <Card ref={ref} border="light" className="shadow-sm h-100">
      <Card.Body>
        <div className="d-flex flex-row align-items-center flex-0 bg-none">
          <div className="d-block ms-3">
            <h5 className="fw-normal mb-2">{title}</h5>
            <h3>{slot === "week" ? value.week : value.month}</h3>
            {portion.current ? (
              <small className="fw-bold mt-2">
                <span className="me-2">
                  {slot === "week" ? "Hôm qua" : "Tháng trước"}
                </span>
                <FontAwesomeIcon
                  icon={portion.icon}
                  className={`${portion.color} me-1`}
                />
                <span className={portion.color}>{portion.current}%</span>
              </small>
            ) : (
              <br />
            )}
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
        <div className="m-0 me-1">
          <TransactionChart slot={slot} />
        </div>
      </Card.Body>
    </Card>
  );
});

export default TransactionWidget;
