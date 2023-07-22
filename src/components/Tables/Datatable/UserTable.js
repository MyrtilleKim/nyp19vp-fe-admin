import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// bootstrap
import { Image, Badge, Dropdown, ListGroup, Button } from "react-bootstrap";

// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faLock,
  faTrash,
  faPlus,
  faAddressCard,
  faEnvelope,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";

// data
import { getAllUsers } from "store/requests/user";

// project import
import Modals from "components/Modal";
import SampleTable from "./SampleTable";
import ModalForm from "components/Forms/ModalForm";

// third party
import * as Yup from "yup";

const UserTable = () => {
  const [delAction, setDelAction] = useState(false);
  const [lockAction, setLockAction] = useState(false);
  const [addAction, setAddAction] = useState(false);
  const [selected, setSelected] = useState();
  const phoneRegExp = /(\+84|84|0)+([3|5|7|8|9])+([0-9]{8})\b/;

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
  const { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    getAllUsers(dispatch);
  }, [dispatch]);

  const schema = Yup.object().shape({
    name: Yup.string().max(255).required("Bắt buộc"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .max(255)
      .required("Bắt buộc"),
    phone: Yup.string().matches(phoneRegExp, "Số điện thoại không hợp lệ"),
    password: Yup.string().max(255).required("Bắt buộc"),
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
      prop: "avatar",
      cell: (row) => (
        <Image
          src={row.avatar}
          className="user-avatar xs-avatar shadow "
          roundedCircle
          alt={row._id}
        />
      ),
      cellProps: {
        style: { width: "1.5rem" },
      },
    },
    {
      isFilterable: true,
      isSortable: true,
      prop: "name",
      title: "Họ & Tên",
    },
    {
      isFilterable: true,
      isSortable: true,
      prop: "email",
      title: "Email",
    },
    {
      isFilterable: true,
      isSortable: true,
      prop: "role",
      title: "Quyền",
      cell: (row) => (
        <Badge
          pill
          bg={row.role === "admin" ? "primary" : "quaternary"}
          style={{ width: "3.5rem" }}
          className="tag"
        >
          {row.role === "admin" ? "Admin" : "User"}
        </Badge>
      ),
    },
    {
      isFilterable: false,
      isSortable: true,
      prop: "updatedAt",
      title: "Cập nhật",
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
                <FontAwesomeIcon icon={faTrash} /> Xóa tài khoản
              </Dropdown.Item>
              <Dropdown.Item
                className="text-start text-dark py-3"
                onClick={(e) => handleLockAction(row)}
              >
                <FontAwesomeIcon icon={faLock} /> Khóa tài khoản
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
        title="Tài khoản"
        header={HEADER}
        body={userInfo}
        onRowClick={onRowClick}
      >
        <Button
          variant="primary"
          className="fw-bolder ms-3"
          onClick={handleAddAction}
        >
          <FontAwesomeIcon icon={faPlus} /> Thêm tài khoản
        </Button>
      </SampleTable>
    </>
  );
};
export default UserTable;
// Then, use it in a component.
