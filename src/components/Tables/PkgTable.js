import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// bootstrap
import { Dropdown, ListGroup, Button } from "react-bootstrap";

// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faTrash,
  faPlus,
  faAddressCard,
  faEnvelope,
  faPhoneAlt,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

// data
import { getAllPackages } from "store/requests/package";

// project import
import Modals from "components/Modal";
import SampleTable from "./Datatable/SampleTable";
import ModalForm from "components/Forms/ModalForm";

// third party
import * as Yup from "yup";

const PackageTable = () => {
  const [delAction, setDelAction] = useState(false);
  const [lockAction, setLockAction] = useState(false);
  const [addAction, setAddAction] = useState(false);
  const [selected, setSelected] = useState();

  const handleClose = () => {
    setDelAction(false);
    setLockAction(false);
    setAddAction(false);
  };
  const handleDelAction = (row) => {
    setSelected(row);
    setDelAction(true);
  };
  const handleLockAction = (row) => {
    setSelected(row);
    setLockAction(true);
  };
  const handleAddAction = () => setAddAction(true);

  let navigate = useNavigate();
  function onRowClick(data) {
    navigate(`/users/${data._id}`);
  }
  const dispatch = useDispatch();
  const { packages } = useSelector((state) => state.packages);
  const [curBody, setCurBody] = useState(packages);
  useEffect(() => {
    getAllPackages(dispatch);
    setCurBody(packages);
  }, [dispatch, packages]);

  const schema = Yup.object().shape({
    name: Yup.string().max(255).required("Bắt buộc"),
  });

  const initValues = {
    name: "",
    dob: "",
    phone: "",
    email: "",
    password: "",
    submit: null,
  };

  // icons
  const icons = {
    faAddressCard,
    faEnvelope,
    faPhoneAlt,
  };

  const addForm = [
    {
      title: "Họ & Tên",
      icon: icons.faAddressCard,
      name: "name",
      type: "text",
      placeholder: "Nhập họ và tên",
      classes: { formGroup: "mb-4", formControl: "input-out-button-group" },
      required: true,
    },
    {
      title: "Email",
      icon: icons.faEnvelope,
      name: "email",
      type: "email",
      placeholder: "Nhập email",
      classes: { formGroup: "mb-4", formControl: "input-out-button-group" },
      required: true,
    },
    { title: "Ngày sinh", name: "birthday", classes: { formGroup: "mb-4" } },
    {
      title: "Số điện thoại",
      icon: icons.faPhoneAlt,
      name: "phone",
      type: "text",
      placeholder: "Nhập số điện thoại",
      classes: { formGroup: "mb-4", formControl: "input-out-button-group" },
    },
    {
      title: "Mật khẩu",
      name: "password",
      classes: {
        formGroup: "mb-4",
        formControl: "input-button-group",
      },
      checkStrength: true,
    },
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
      isFilterable: true,
      isSortable: true,
      prop: "name",
      title: "Gói dịch vụ",
    },
    {
      isFilterable: false,
      isSortable: true,
      prop: "duration",
      title: "Thời hạn",
      cell: (row) => <span>{row.duration} tháng</span>,
    },
    {
      isFilterable: false,
      isSortable: true,
      prop: "noOfMember",
      title: "Thành viên",
    },
    {
      isFilterable: false,
      isSortable: true,
      prop: "price_vnd",
      title: "Đơn giá",
    },
    {
      isFilterable: false,
      isSortable: true,
      prop: "updatedAt",
      title: "Cập nhật",
      cell: (row) => (
        <span>
          <FontAwesomeIcon icon={faClock} /> {row.updatedAt}
        </span>
      ),
    },
    {
      prop: "button",
      cellProps: { style: { width: "10px" } },
      cell: (row) => (
        <Dropdown>
          <Dropdown.Toggle
            className="text-dark me-lg-1 dropdown-table-option"
            id="dropdown-autoclose-true"
          >
            <span className="icon icon-sm m-0">
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="notifications-dropdown shadow rounded-3 mt-2 py-0 ">
            <ListGroup className="list-group-flush">
              <Dropdown.Item
                className="text-start text-dark py-3"
                onClick={(e) => handleDelAction(row)}
              >
                <FontAwesomeIcon icon={faPen} /> Chỉnh sửa gói
              </Dropdown.Item>
              <Dropdown.Item
                className="text-start text-dark py-3"
                onClick={(e) => handleLockAction(row)}
              >
                <FontAwesomeIcon icon={faTrash} /> Xóa gói
              </Dropdown.Item>
            </ListGroup>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];
  return (
    <>
      <Modals title="Xác nhận" show={delAction} handleClose={handleClose}>
        {selected && (
          <h6>
            Bạn có chắc chắn muốn xóa tài khoản #{selected._id} {selected.name}?
          </h6>
        )}
      </Modals>
      <Modals title="Xác nhận" show={lockAction} handleClose={handleClose}>
        {selected && (
          <h6>
            Bạn có chắc chắn muốn khóa tài khoản #{selected._id} {selected.name}
            ?
          </h6>
        )}
      </Modals>
      <ModalForm
        title="Thêm tài khoản"
        show={addAction}
        handleClose={handleClose}
        schema={schema}
        initValues={initValues}
        forms={addForm}
      ></ModalForm>
      <SampleTable
        title="Gói dịch vụ"
        header={HEADER}
        body={curBody}
        onRowClick={onRowClick}
      >
        <Button
          variant="primary"
          className="fw-bolder ms-3"
          onClick={handleAddAction}
        >
          <FontAwesomeIcon icon={faPlus} /> Thêm gói
        </Button>
      </SampleTable>
    </>
  );
};
export default PackageTable;
// Then, use it in a component.
