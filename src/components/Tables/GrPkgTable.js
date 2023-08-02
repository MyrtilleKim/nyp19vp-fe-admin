import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

import { findMainPackage } from "store/requests/group";
const GroupPackageTable = ({ group }) => {
  const [packages, setPackages] = useState(
    group.packages.filter(
      (item) => !_.isEqual(item, findMainPackage(group.packages))
    )
  );
  const PackageCard = (packages) => {
    return (
      <Card border="light" className="bg-white shadow-sm h-100">
        <Card.Body>
          <Row className="mb-4">
            <Col xs={12}>
              <h5>{packages.package.name}</h5>
            </Col>
            <Col>
              <FontAwesomeIcon icon={faCalendarCheck} /> <b>Thời hạn: </b>
              {packages.package.duration} tháng
            </Col>
            <Col>
              <FontAwesomeIcon icon={faUser} /> <b>Thành viên: </b>
              {packages.package.noOfMember} người
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  };
  useEffect(() => {
    setPackages(
      group.packages.filter(
        (item) => !_.isEqual(item, findMainPackage(group.packages))
      )
    );
  }, [group]);
  return (
    <>
      <Card border="light" className="bg-white shadow-sm h-100">
        <Card.Body>
          <h5 className="mb-3">
            <b>Lịch sử mua gói</b>
          </h5>
          <Row>
            {packages.map((pkg) => {
              return (
                <PackageCard key={`member-card-${pkg.id}`} packages={pkg} />
              );
            })}
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};
export default GroupPackageTable;
