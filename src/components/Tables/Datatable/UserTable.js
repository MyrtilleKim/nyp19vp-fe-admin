import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// bootstrap
import {
  Image,
  Badge,
  Dropdown,
  ListGroup,
  Button,
  Container,
} from "react-bootstrap";

// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faLock,
  faTrash,
  faTrashArrowUp,
  faPlus,
  faAddressCard,
  faEnvelope,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

// data
import { getAllUsers } from "store/requests/user";

// project import
import Modals from "components/Modal";
import SampleTable from "./SampleTable";
import ModalForm from "components/Forms/ModalForm";
import { removeUser, restoreUser } from "store/requests/user";
import { createAxios } from "http/createInstance";
import { loginSuccess } from "store/reducers/auth";
import Alerts from "components/Alerts";

// third party
import * as Yup from "yup";
import { HttpStatusCode } from "axios";

const UserTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state?.auth.login);
  const { userInfo } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [classes, setClasses] = useState({
    alertVariant: "danger",
    alertClass: "fixed-top mx-auto",
  });
  const [addAction, setAddAction] = useState(false);
  const [selected, setSelected] = useState();
  const phoneRegExp = /(\+84|84|0)+([3|5|7|8|9])+([0-9]{8})\b/;
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  function onRowClick(data) {
    navigate(`/users/${data._id}`);
  }
  useEffect(() => {
    getAllUsers(dispatch);
  }, [dispatch]);
  const handleClose = () => {
    setShowModal(false);
    setAddAction(false);
  };
  const handleAlert = (title, content, variant) => {
    setTitle(title);
    setContent(content);
    setClasses({
      alertVariant: variant,
      alertClass: "fixed-top mx-auto",
    });
  };
  const handleAction = (row, action) => {
    if (typeof action === "object") {
      const valuesArray = Object.values(action);
      action = valuesArray.join("").trim();
    }
    setAction(action);
    setSelected(row);
    if (action === "remove") {
      setContent(`Bạn có chắc chắn muốn xóa tài khoản này?`);
    } else if (action === "restore") {
      setContent(`Bạn có chắc chắn muốn khôi phục tài khoản này?`);
    } else {
      setContent(`Bạn có chắc chắn muốn khóa tài khoản này?`);
    }
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setShowModal(false);
    let res;
    let error = false;
    if (action === "remove") {
      res = await removeUser(
        selected._id,
        currentUser?.accessToken,
        dispatch,
        axiosJWT
      );
      if (res.statusCode === HttpStatusCode.Ok) {
        handleAlert("Thành công", "Xóa tài khoản thành công", "success");
      } else error = true;
    } else if (action === "restore") {
      res = await restoreUser(
        selected._id,
        currentUser?.accessToken,
        dispatch,
        axiosJWT
      );
      if (res.statusCode === HttpStatusCode.Ok) {
        handleAlert("Thành công", "Khôi phục tài khoản thành công", "success");
      } else error = true;
    }
    if (error) {
      handleAlert("Thất bại", res.message, "danger");
      error = false;
    }
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };
  const handleAddAction = () => setAddAction(true);
  const filter = [
    { title: "Admin", value: "admin" },
    { title: "User", value: "user" },
  ];
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
      _Type: "simple",
    },
    {
      title: "Email",
      icon: icons.faEnvelope,
      name: "email",
      type: "email",
      placeholder: "Nhập email",
      classes: { formGroup: "mb-4", formControl: "input-out-button-group" },
      required: true,
      _Type: "simple",
    },
    {
      title: "Ngày sinh",
      name: "birthday",
      classes: { formGroup: "mb-4", formControl: "input-out-button-group" },
      _Type: "date",
    },
    {
      title: "Số điện thoại",
      icon: icons.faPhoneAlt,
      name: "phone",
      type: "text",
      placeholder: "Nhập số điện thoại",
      classes: { formGroup: "mb-4", formControl: "input-out-button-group" },
      _Type: "simple",
    },
    {
      title: "Mật khẩu",
      name: "password",
      classes: {
        formGroup: "mb-4",
        formControl: "input-button-group",
      },
      checkStrength: true,
      _Type: "password",
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
      isFilterable: true,
      prop: "_id",
    },
    {
      prop: "avatar",
      cell: (row) => (
        <Image
          src={row.avatar}
          className="user-avatar shadow "
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
      prop: "deleted",
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
                onClick={(e) =>
                  handleAction(row, {
                    ...(row.deleted ? "restore" : " remove"),
                  })
                }
              >
                {row.deleted ? (
                  <>
                    <FontAwesomeIcon icon={faTrashArrowUp} /> Khôi phục tài
                    khoản
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faTrash} /> Xóa tài khoản
                  </>
                )}
              </Dropdown.Item>
              <Dropdown.Item
                className="text-start text-dark py-3"
                onClick={(e) => handleAction(row)}
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
    <Container>
      <Alerts
        show={showAlert}
        handleClose={handleClose}
        title={title}
        classes={classes}
      >
        {content}
      </Alerts>
      <Modals
        title="Xác nhận"
        show={showModal}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      >
        {selected && <h6>{content}</h6>}
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
        filter={filter}
        filterKey="role"
      >
        <Button
          variant="primary"
          className="fw-bolder ms-3"
          onClick={handleAddAction}
        >
          <FontAwesomeIcon icon={faPlus} /> Thêm tài khoản
        </Button>
      </SampleTable>
    </Container>
  );
};
export default UserTable;
// Then, use it in a component.
