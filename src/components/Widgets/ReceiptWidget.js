import { useState, useEffect } from "react";

// bootstrap
import { Row, Col, Image } from "react-bootstrap";

// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt, faUser } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import VnPayLogo from "assets/payment/VnPay.png";
import ZaloPayLogo from "assets/payment/ZaloPay.png";

import SampleTable from "components/Tables/BSTable/SampleTable";
import { formatCurrency } from "store/requests/user";

// ==============================|| Receipt Widget ||============================== //
const ReceiptWidget = ({ trans, userInfo }) => {
  const header = [
    "Mặt hàng",
    "Thành viên",
    "Thời hạn",
    "Số lượng",
    "Thành tiền",
  ];
  const [body, setBody] = useState(mapItemBody(trans.item));
  useEffect(() => {
    setBody(mapItemBody(trans.item));
  }, [trans]);
  return (
    <>
      <Row>
        <Col xs={12} lg={6} className="ps-3">
          <FontAwesomeIcon icon={faUser} /> <b>Khách hàng: </b> {userInfo.name}
        </Col>
        <Col xs={12} lg={6} className="ps-3">
          <FontAwesomeIcon icon={faReceipt} /> <b>Hóa đơn: </b>
          {trans._id}
        </Col>
      </Row>
      <div className="d-flex flex-row justify-content-between"></div>
      <hr className="dash" />
      <SampleTable header={header} body={body} classes="receipt" />
      <hr className="dash" />
      <Row>
        <Col xs={6}>
          <h6 className="fw-bold ps-2">Thành tiền: </h6>
        </Col>
        <Col xs={6} className="text-end pe-4">
          {trans.amount_vnd}
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <h6 className="fw-bold ps-2">Thuế: </h6>
        </Col>
        <Col xs={6} className="text-end pe-4">
          {formatCurrency(0)}
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <h6 className="fw-bold ps-2">Giảm giá: </h6>
        </Col>
        <Col xs={6} className="text-end pe-4">
          {formatCurrency(0)}
        </Col>
      </Row>
      <hr className="dash" />
      <Row>
        <Col xs={6}>
          <h5 className="fw-bold ps-2">Tổng tiền: </h5>
        </Col>
        <Col xs={6} className="text-end pe-4">
          {trans.amount_vnd}
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <h5 className="fw-bold ps-2">Phương thức </h5>
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
      <div className="text-end pe-2">
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
