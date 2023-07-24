import { useState, useEffect } from "react";

// bootstrap
import { Container, Row, Col, Image } from "react-bootstrap";

// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt, faUser, faWallet } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import VnPayLogo from "assets/payment/VnPay.png";
import ZaloPayLogo from "assets/payment/ZaloPay.png";

import SampleTable from "components/Tables/BSTable/SampleTable";

// ==============================|| Receipt Widget ||============================== //
const ReceiptWidget = ({ trans, userInfo }) => {
  const header = [
    "Mặt hàng",
    "Thành viên",
    "Thời hạn",
    "Số lượng",
    "Thành tiền",
  ];
  console.log(trans.item);
  const [body, setBody] = useState(mapItemBody(trans.item));
  useEffect(() => {
    setBody(mapItemBody(trans.item));
  }, [trans]);
  return (
    <>
      <Row>
        <Col xs={12} lg={6}>
          <FontAwesomeIcon icon={faUser} /> <b>Khách hàng: </b> {userInfo.name}
        </Col>
        <Col xs={12} lg={6}>
          <FontAwesomeIcon icon={faReceipt} /> <b>Hóa đơn: </b>
          {trans._id}
        </Col>
      </Row>
      <div className="d-flex flex-row justify-content-between"></div>
      <hr className="dash" />
      <SampleTable header={header} body={body} classes="receipt" />
      <Row>
        <Col xs={6}>
          <h5 className="fw-bold">Tổng tiền: </h5>
        </Col>
        <Col xs={6} className="text-end pe-4">
          {trans.amount_vnd}
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <h5 className="fw-bold">Phương thức </h5>
        </Col>
        <Col xs={6} className="pe-4">
          <Image
            src={trans.wallet === "ZaloPay" ? ZaloPayLogo : VnPayLogo}
            className="payment-logo"
            style={{ float: "right" }}
            alt={trans.wallet}
          />
        </Col>
      </Row>
      <hr className="dash" />
      <div className="text-end">
        <FontAwesomeIcon icon={faClock} /> {trans.createdAt}
      </div>
    </>
  );
};

export default ReceiptWidget;

function mapItemBody(items) {
  const itemBody = items.map((item) => {
    return {
      name: item.name,
      noOfMember: item.noOfMember,
      duration: `${item.duration} tháng`,
      quantity: item.quantity,
      price: item.price_vnd,
    };
  });
  return itemBody;
}
