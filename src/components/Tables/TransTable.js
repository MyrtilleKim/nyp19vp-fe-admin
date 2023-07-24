import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// bootstrap
import { Image, Dropdown, ListGroup, Button } from "react-bootstrap";

// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faLock,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import VnPayLogo from "assets/payment/VnPay.png";
import ZaloPayLogo from "assets/payment/ZaloPay.png";

// project import
import MiniTable from "./Datatable/MiniTable";
import Modals from "components/Modal";
import ReceiptWidget from "components/Widgets/ReceiptWidget";

const TransTable = ({ trans, userInfo }) => {
  const [receipt, setReceipt] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [curBody, setCurBody] = useState(trans);
  const handleClose = () => {
    setShowReceipt(false);
  };
  function onRowClick(data) {
    setReceipt(trans.filter((item) => item._id === data._id).at(0));
    setShowReceipt(true);
  }

  useEffect(() => {
    setCurBody(trans);
  }, [trans]);
  const filter = [
    { title: "ZaloPay", value: "ZaloPay" },
    { title: "VnPay", value: "VnPay" },
  ];
  function handleSelect(event) {
    const selected = event.target.value;

    if (selected === "all") {
      setCurBody(trans);
    } else {
      const filtered = trans.filter((elem) => elem.wallet === selected);
      setCurBody(filtered);
    }
  }
  const HEADER = [
    {
      alignment: {
        horizontal: "center",
      },
      checkbox: {
        className: "table-checkbox",
        idProp: "_id",
      },
      prop: "checkbox",
    },
    {
      prop: "_id",
    },
    {
      prop: "_id",
      title: "No.",
      isFilterable: true,
    },
    {
      isFilterable: false,
      isSortable: true,
      prop: "amount_vnd",
      title: "Tổng tiền",
    },
    {
      isFilterable: false,
      isSortable: false,
      prop: "wallet",
      title: "Phương thức",
      cell: (row) => (
        <Image
          src={row.wallet === "ZaloPay" ? ZaloPayLogo : VnPayLogo}
          className="payment-logo"
          alt={row.wallet}
        />
      ),
    },
    {
      isFilterable: false,
      isSortable: true,
      prop: "createdAt",
      title: "Ngày lập",
      cell: (row) => (
        <span>
          <FontAwesomeIcon icon={faClock} /> {row.createdAt}
        </span>
      ),
    },
    {
      prop: "button",
      cellProps: { style: { width: "10px" } },
      cell: (row) => (
        <Button className="btn-table-options">
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      ),
    },
  ];
  return (
    <>
      <Modals
        title="Hóa đơn"
        show={showReceipt}
        handleClose={handleClose}
        size="lg"
      >
        <ReceiptWidget trans={receipt} userInfo={userInfo} />
      </Modals>
      <MiniTable
        title="Giao dịch"
        header={HEADER}
        body={curBody}
        onRowClick={onRowClick}
        filter={filter}
        handleFilter={handleSelect}
      ></MiniTable>
    </>
  );
};
export default TransTable;
