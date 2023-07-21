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
  Form,
  InputGroup,
} from "react-bootstrap";

// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faLock,
  faTrash,
  faPlus,
  faEye,
  faEyeSlash,
  faEnvelope,
  faUnlockAlt,
  faAddressCard,
  faCalendarAlt,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";

// data
import { getInformationUser } from "store/reducers/userReq";

// project import
import Modals from "components/Modal";
import SampleTable from "./SampleTable";

// third-party
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment-timezone";
import Datetime from "react-datetime";

const UserTable = () => {
  const [delAction, setDelAction] = useState(false);
  const [lockAction, setLockAction] = useState(false);
  const [addAction, setAddAction] = useState(false);
  const [selected, setSelected] = useState();
  const [showPassword, setShowPassword] = React.useState(false);
  const [birthday, setBirthday] = useState("");
  const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();
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
    console.log(`You clicked on the row ${data.username} ${data.score}`);
    navigate(`/users/${data._id}`);
  }
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    getInformationUser(dispatch);
  }, [dispatch]);

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
      <Modals title="Thêm tài khoản" show={addAction} handleClose={handleClose}>
        <Formik
          validationSchema={Yup.object().shape({
            name: Yup.string().max(255).required("Bắt buộc"),
            email: Yup.string()
              .email("Email không hợp lệ")
              .max(255)
              .required("Bắt buộc"),
            phone: Yup.string().matches(
              phoneRegExp,
              "Số điện thoại không hợp lệ"
            ),
            password: Yup.string().max(255).required("Bắt buộc"),
          })}
          initialValues={{
            name: "Night Owl",
            dob: "",
            phone: "0986452575",
            email: "admin@gmail.com",
            password: " password",
            submit: null,
          }}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              setStatus({ success: false });
              setSubmitting(false);
            } catch (err) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <Form noValidate className="mb-3" onSubmit={handleSubmit}>
              <Form.Group id="name" className="mb-4">
                <Form.Label>Họ & Tên</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faAddressCard} />
                  </InputGroup.Text>
                  <Form.Control
                    className="input-out-button-group"
                    required
                    type="string"
                    value={values.name}
                    placeholder="Enter name"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    isInvalid={!!(touched.name && errors.name)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group id="email" className="mb-4">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputGroup.Text>
                  <Form.Control
                    className="input-out-button-group"
                    required
                    type="email"
                    value={values.email}
                    placeholder="megoo@example.com"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    isInvalid={!!(touched.email && errors.email)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group id="birthday" className="mb-4">
                <Form.Label>Ngày sinh</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setBirthday}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        value={
                          birthday ? moment(birthday).format("DD/MM/YYYY") : ""
                        }
                        defaultValue={userInfo.dob}
                        placeholder="dd/mm/yyyy"
                        onFocus={openCalendar}
                        onChange={() => {}}
                      />
                    </InputGroup>
                  )}
                />
              </Form.Group>
              <Form.Group id="phone-number" className="mb-4">
                <Form.Label>Số điện thoại</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faPhoneAlt} />
                  </InputGroup.Text>
                  <Form.Control
                    className="input-out-button-group"
                    type="string"
                    value={values.string}
                    placeholder="0000 000 000"
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    isInvalid={!!(touched.phone && errors.phone)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Group id="password" className="mb-4">
                  <Form.Label>Mật khẩu</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faUnlockAlt} />
                    </InputGroup.Text>
                    <Form.Control
                      className="input-button-group"
                      required
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      placeholder="Password"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      isInvalid={!!(touched.password && errors.password)}
                    />
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <FontAwesomeIcon icon={faEye} />
                      ) : (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      )}
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Form.Group>
              {/* <div className="d-grid gap-auto">
                <Button
                  variant="primary"
                  disabled={isSubmitting}
                  type="submit"
                  className="btn btn-primary btn-login"
                >
                  Đăng nhập
                </Button>
              </div> */}
            </Form>
          )}
        </Formik>
      </Modals>
      <SampleTable header={HEADER} body={userInfo} onRowClick={onRowClick}>
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
