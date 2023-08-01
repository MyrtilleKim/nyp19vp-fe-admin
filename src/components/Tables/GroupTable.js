import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

// bootstrap
import {
  Button,
  Container,
  Image,
  Stack,
  Popover,
  OverlayTrigger,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";

// material-ui
import { Autocomplete, TextField, Box, InputAdornment } from "@mui/material";

// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlus,
  faTrashArrowUp,
  faCircleCheck,
  faCircleExclamation,
  faGripLines,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

// data
import { getAllGroups } from "store/requests/group";
import { getAllPackages } from "store/requests/package";
import { getAllUsers } from "store/requests/user";

// project import
import Modals from "components/Modal";
import SampleTable from "./Datatable/SampleTable";
import Alerts from "components/Alerts";
import { removeGroup, restoreGroup, createGroup } from "store/requests/group";
import { reinitializeState } from "store/reducers/group";

// third party
import * as Yup from "yup";
import { Formik } from "formik";
import { HttpStatusCode } from "axios";
import { Link } from "react-router-dom";

const GroupTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // dispatch(reinitializeState());
  const { groups } = useSelector((state) => state?.group);
  const { packages } = useSelector((state) => state.packages);
  const { userInfo } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState();
  const [selected, setSelected] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [addAction, setAddAction] = useState(false);
  const [classes, setClasses] = useState({
    alertVariant: "danger",
    alertClass: "fixed-top mx-auto",
  });
  const initValues = {
    packages: null,
    duration: 1,
    noOfMember: 2,
    member: null,
    submit: null,
  };
  useEffect(() => {
    getAllGroups(dispatch);
    getAllUsers(dispatch);
    getAllPackages(dispatch);
  }, [dispatch]);
  function onRowClick(data) {
    navigate(`/groups/${data._id}`);
  }
  const handleAction = (row, action) => {
    if (typeof action === "object") {
      const valuesArray = Object.values(action);
      action = valuesArray.join("").trim();
    }
    setAction(action);
    setSelected(row);
    if (action === "remove") {
      setContent(`Bạn có chắc chắn muốn xóa nhóm ${row.name}?`);
    } else if (action === "restore") {
      setContent(`Bạn có chắc chắn muốn khôi phục nhóm ${row.name}?`);
    }
    setShowModal(true);
  };
  const handleConfirm = async () => {
    setShowModal(false);
    let res;
    let error = false;
    if (action === "remove") {
      res = await removeGroup(selected._id, dispatch);
      if (res.statusCode === HttpStatusCode.Ok) {
        handleAlert("Thành công", "Xóa nhóm thành công", "success");
      } else error = true;
    } else if (action === "restore") {
      res = await restoreGroup(selected._id, dispatch);
      if (res.statusCode === HttpStatusCode.Ok) {
        handleAlert("Thành công", "Khôi phục nhóm thành công", "success");
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
  const handleClose = () => {
    setShowModal(false);
    setShowAlert(false);
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
  const handleAddAction = () => setAddAction(true);
  const handleShowAlert = (title, content, variant) => {
    handleAlert(title, content, variant);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };
  const filter = [
    { title: "Đang kích hoạt", value: "Active" },
    { title: "Chưa kích hoạt", value: "Not Activated" },
    { title: "Đã hết hạn", value: "Expired" },
  ];
  const popover = ({ user }) => {
    return (
      <Popover id="popover-basic">
        <Popover.Header as="h3">Quản trị viên</Popover.Header>
        <Popover.Body>
          <Stack direction="horizontal">
            <Image
              src={user?.avatar}
              className="user-avatar lg-avatar shadow "
              roundedCircle
              alt={user?._id}
            />
            <div className="d-block ms-2">
              <h5 className="fw-bold">{user?.name}</h5>
              <h6 className="fw-normal">{user?.email}</h6>
            </div>
          </Stack>
        </Popover.Body>
      </Popover>
    );
  };
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
      title: "Tên nhóm",
    },
    {
      isSortable: true,
      prop: "members",
      title: "Thành viên",
      cell: (row) => {
        return <>{row.members.length}</>;
      },
    },
    {
      prop: "status",
      title: "Trạng thái",
      cell: (row) => {
        return (
          <>
            {row.status === "Active" && (
              <span className="text-quaternary">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="icon icon-xs"
                />{" "}
                Đang kích hoạt
              </span>
            )}
            {row.status === "Not Activated" && (
              <span className="text-primary">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="icon icon-xs"
                />{" "}
                Chưa kích hoạt
              </span>
            )}
            {row.status === "Expired" && (
              <span className="text-danger">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="icon icon-xs"
                />{" "}
                Đã hết hạn
              </span>
            )}
          </>
        );
      },
    },
    {
      isFilterable: true,
      prop: "members",
      title: "Quản trị",
      cell: (row) => {
        const su = row.members.filter((member) => member.role === "Super User");
        return (
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={popover(su[0])}
          >
            <Stack direction="horizontal">
              <Image
                src={su[0].user?.avatar}
                className="user-avatar shadow "
                roundedCircle
                alt={row._id}
              />
              <Button
                className="m-0 p-0 btn-table-options"
                as={Link}
                to={`/users/${su[0].user._id}`}
              >
                <FontAwesomeIcon icon={faGripLines} className="ps-2" />
              </Button>
            </Stack>
          </OverlayTrigger>
        );
      },
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
        <Button
          className="btn-table-options"
          onClick={(e) =>
            handleAction(row, {
              ...(row.deleted ? "restore" : " remove"),
            })
          }
        >
          <FontAwesomeIcon icon={row.deleted ? faTrashArrowUp : faTrash} />
        </Button>
      ),
    },
  ];
  const packageProps = {
    options: packages.filter((pkg) => !pkg.deleted),
    getOptionLabel: (option) => option.name,
  };
  const userProps = {
    options: userInfo.filter((user) => !user.deleted && user.role !== "admin"),
    getOptionLabel: (option) => option.name,
  };
  const schema = Yup.object().shape({
    packages: Yup.object().required("Bắt buộc"),
    duration: Yup.number()
      .min(1, "Thời hạn ít nhất là 1 tháng")
      .max(36, "Thời hạn không nhiều hơn 36 tháng")
      .required("Bắt buộc"),
    noOfMember: Yup.number()
      .min(2, "Ít nhất phải có 2 thành viên")
      .max(30, "Thành viên tối đa không được vượt 30 người")
      .required("Bắt buộc"),
    member: Yup.string().max(255).required("Bắt buộc"),
  });
  return (
    <Container>
      <Modal show={addAction} onHide={handleClose} scrollable={false}>
        <Modal.Header closeButton>
          <Modal.Title>Nhóm</Modal.Title>
        </Modal.Header>
        <Formik
          validationSchema={schema}
          initialValues={initValues}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              setStatus({ success: false });
              setSubmitting(false);
              if (!_.isEqual(values, initValues)) {
                let formData = {
                  packages: [
                    {
                      _id: values.packages._id,
                      duration: values.duration,
                      noOfMember: values.noOfMember,
                      quantity: 1,
                    },
                  ],
                  member: {
                    user: values.member,
                  },
                };
                const res = await createGroup(formData, dispatch);
                if (res.statusCode === HttpStatusCode.Created) {
                  handleClose();
                  handleAlert("Thành công", "Tạo nhóm thành công", "success");
                } else {
                  handleAlert("Thất bại", res.message, "danger");
                }
                setShowAlert(true);
                setTimeout(() => {
                  setShowAlert(false);
                }, 1000);
              } else {
                handleShowAlert("Thông báo", "Không có gì thay đổi", "primary");
              }
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
            setFieldValue,
          }) => (
            <Form noValidate className="mb-3" onSubmit={handleSubmit}>
              <Modal.Body>
                <h6 className="fw-bold mb-3">Gói dịch vụ</h6>
                <Autocomplete
                  {...packageProps}
                  id="packages"
                  onChange={(e, value) => {
                    console.log(value);
                    setFieldValue("packages", value);
                    setFieldValue("duration", value.duration);
                    setFieldValue("noOfMember", value.noOfMember);
                  }}
                  onBlur={handleBlur}
                  disableClearable
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Gói dịch vụ"
                      size="small"
                      error={touched.packages && Boolean(errors.packages)}
                      helperText={touched.packages && errors.packages}
                      style={{ borderRadius: "0.5rem" }}
                      value={values.packages}
                    />
                  )}
                />
                <Row className="mt-4">
                  <Col className="mt-2">
                    <TextField
                      id="noOfMember"
                      name="noOfMember"
                      label="Thành viên"
                      size="small"
                      type="number"
                      value={values.noOfMember}
                      disabled={
                        values.packages && !values.packages.editableNoOfMember
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.noOfMember && Boolean(errors.noOfMember)}
                      helperText={touched.noOfMember && errors.noOfMember}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">người</InputAdornment>
                        ),
                      }}
                    />
                  </Col>
                  <Col className="mt-2">
                    <TextField
                      id="duration"
                      name="duration"
                      label="Thời hạn"
                      size="small"
                      type="number"
                      value={values.duration}
                      disabled={
                        values.packages && !values.packages.editableDuration
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.duration && Boolean(errors.duration)}
                      helperText={touched.duration && errors.duration}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">tháng</InputAdornment>
                        ),
                      }}
                    />
                  </Col>
                </Row>
                <h6 className="mt-4 mb-3 fw-bold">Quản trị viên</h6>
                <Autocomplete
                  {...userProps}
                  id="member"
                  name="member"
                  disableClearable
                  onChange={(e, value) => {
                    console.log(value);
                    setFieldValue("member", value._id);
                  }}
                  onBlur={handleBlur}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{
                        "& > img": { mr: 2, flexShrink: 0 },
                      }}
                      {...props}
                    >
                      <Image
                        src={option.avatar}
                        className="user-avatar xs-avatar shadow "
                        roundedCircle
                        alt={option._id}
                      />
                      <span>
                        <b>{option.name}</b> ({option.email})
                      </span>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Quản trị viên"
                      value={values.member}
                      size="small"
                      style={{ borderRadius: "0.5rem" }}
                      error={touched.member && Boolean(errors.member)}
                      helperText={touched.member && errors.member}
                    />
                  )}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Đóng
                </Button>
                <Button variant="primary" disabled={isSubmitting} type="submit">
                  Xác nhận
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
      <Modals
        title="Xác nhận"
        show={showModal}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      >
        {selected && <h6>{content}</h6>}
      </Modals>
      <Alerts
        show={showAlert}
        handleClose={handleClose}
        title={title}
        classes={classes}
      >
        {content}
      </Alerts>
      <SampleTable
        title="Nhóm"
        header={HEADER}
        body={groups}
        classes="group-management"
        filter={filter}
        filterKey="status"
        onRowClick={onRowClick}
      >
        <Button
          variant="primary"
          className="fw-bolder ms-3"
          onClick={handleAddAction}
        >
          <FontAwesomeIcon icon={faPlus} /> Thêm nhóm
        </Button>
      </SampleTable>
    </Container>
  );
};
export default GroupTable;
