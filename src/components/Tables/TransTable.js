import React, { useEffect, useState } from "react";

// bootstrap
import { Image, Button } from "react-bootstrap";

// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
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
  const handleClose = () => {
    setShowReceipt(false);
  };
  function onRowClick(data) {
    setReceipt(trans.filter((item) => item._id === data._id).at(0));
    setShowReceipt(true);
  }

  useEffect(() => {}, [trans]);
  const filter = [
    { title: "ZaloPay", value: "ZaloPay" },
    { title: "VnPay", value: "VnPay" },
  ];
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
      isSortable: true,
      prop: "amount_vnd",
      title: "Tổng tiền",
    },
    {
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
        body={trans}
        onRowClick={onRowClick}
        filter={filter}
        filterKey="wallet"
      ></MiniTable>
    </>
  );
};
export default TransTable;
