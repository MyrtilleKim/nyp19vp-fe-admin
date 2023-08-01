import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

// bootstrap
import {
  Card,
  Row,
  Col,
  Stack,
  Image,
  Form,
  CloseButton,
  Button,
} from "react-bootstrap";

// material-ui
import { Autocomplete, TextField, Box } from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// data
import { getAllUsers } from "store/requests/user";
import { addMemb, rmMemb } from "store/requests/group";
import Alerts from "components/Alerts";
import Modals from "components/Modal";
import { HttpStatusCode } from "axios";
import { createAxios } from "http/createInstance";
import { loginSuccess } from "store/reducers/auth";
import { findMainPackage } from "store/requests/group";

const MemberForm = ({ group }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state?.auth.login);
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);
  const { userInfo } = useSelector((state) => state.user);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [classes, setClasses] = useState({
    alertVariant: "danger",
    alertClass: "fixed-top mx-auto",
  });
  const [packages, setPackages] = useState(findMainPackage(group.packages));
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    getAllUsers(dispatch);
  }, [dispatch]);
  useEffect(() => {
    setPackages(findMainPackage(group.packages));
  }, [group]);
  const userProps = {
    options: userInfo.filter(
      (user) =>
        !user.deleted &&
        user.role !== "admin" &&
        !group.members.some((elem) => elem.user._id === user._id)
    ),
    getOptionLabel: (option) => option.name,
  };
  const handleAlert = (title, content, variant) => {
    setTitle(title);
    setContent(content);
    setClasses({
      alertVariant: variant,
      alertClass: "fixed-top mx-auto",
    });
  };
  const handleClose = () => {
    setShowAlert(false);
    setShowModal(false);
  };
  const handleConfirm = async () => {
    setShowModal(false);
    let res;
    let error = false;
    let formData = { user: selected.user._id };
    console.log("form", formData, group._id);
    res = await rmMemb(group._id, formData, dispatch);
    if (res.statusCode === HttpStatusCode.Ok) {
      handleAlert("Thành công", "Xóa nhóm thành công", "success");
    } else error = true;
    if (error) {
      handleAlert("Thất bại", res.message, "danger");
      error = false;
    }
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };
  const handleClick = async (member) => {
    // setAction(action);
    // if (action === "remove") setContent("Bạn muốn xóa nhóm này?");
    // else if (action === "restore") setContent("Bạn muốn khôi phục nhóm này?");
    // else if (action === "update") setContent("Bạn muốn đổi tên nhóm?");
    // else if (action === "activate") setContent("Bạn muốn kích hoạt nhóm?");
    setContent("Bạn muốn xóa thành viên này ra khỏi nhóm?");
    setSelected(member);
    console.log("seclect", member);
    setShowModal(true);
  };
  const MemberCard = ({ member }) => {
    const [membList, setMembList] = useState(member);
    useEffect(() => {
      setMembList(member);
    }, [member]);
    const [selectedOption, setSelectedOption] = useState(membList.role);

    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
    };
    return (
      <Col xs={12}>
        <Card className="shadow-sm mb-2">
          <Card.Body className="py-1">
            <Row className="align-items-center">
              <Col
                onClick={() => {
                  navigate(`/users/${membList.user._id}`);
                }}
              >
                <Stack direction="horizontal">
                  <Image
                    src={membList.user.avatar}
                    className="user-avatar xs-avatar"
                    roundedCircle
                  />
                  <p className="ms-2 my-auto fw-bold">{membList.user.name}</p>
                </Stack>
              </Col>
              <Col
                onClick={() => {
                  navigate(`/users/${membList.user._id}`);
                }}
              >
                <p className="my-auto">{membList.user.email}</p>
              </Col>
              <Col>
                <div class="d-flex justify-content-end">
                  <Form.Select
                    className={`py-0 border-0 fw-bold group-select ${
                      selectedOption === "Super User" ? "super-user" : "user"
                    }`}
                    style={{
                      fontSize: "small",
                      width: `calc(${selectedOption.length * 7}px + 3rem)`,
                      outline: "none",
                    }}
                    value={selectedOption}
                    onChange={handleSelectChange}
                  >
                    <option value={"Super User"}>Super User</option>
                    <option value={"User"}>User</option>
                  </Form.Select>
                  <CloseButton
                    className="ms-2"
                    onClick={() => handleClick(membList)}
                  />
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    );
  };
  return (
    <>
      <Modals
        title="Xác nhận"
        show={showModal}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      >
        <h6>{content}</h6>
      </Modals>
      <Alerts
        show={showAlert}
        handleClose={handleClose}
        title={title}
        classes={classes}
      >
        {content}
      </Alerts>
      <Card border="light" className="bg-white shadow-sm h-100">
        <Card.Body>
          <h5 className="mb-4">
            <b>Thành viên</b>
          </h5>
          <Row>
            {group.members.map((member) => {
              return (
                <MemberCard key={`member-card-${member.id}`} member={member} />
              );
            })}
          </Row>
          <Row>
            <Formik
              validationSchema={Yup.object().shape({
                member: Yup.string().required("Bắt buộc"),
              })}
              initialValues={{ member: null }}
              onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting }
              ) => {
                try {
                  setStatus({ success: false });
                  setSubmitting(false);
                  if (values.member !== null) {
                    let formData = { user: values.member };
                    console.log(formData);
                    const res = await addMemb(
                      group._id,
                      currentUser?.accessToken,
                      formData,
                      dispatch,
                      axiosJWT
                    );
                    if (res.statusCode === HttpStatusCode.Ok) {
                      handleClose();
                      handleAlert(
                        "Thành công",
                        "Thêm thành viên thành công",
                        "success"
                      );
                    } else {
                      handleAlert("Thất bại", res.message, "danger");
                    }
                    setShowAlert(true);
                    setTimeout(() => {
                      setShowAlert(false);
                    }, 1000);
                  } else {
                    handleAlert("Thông báo", "Không có gì thay đổi", "primary");
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
                  <Autocomplete
                    {...userProps}
                    id="member"
                    name="member"
                    disabled={
                      group.status !== "Active" ||
                      group.members.length >= packages.package.noOfMember
                    }
                    onChange={(e, value) => {
                      if (value) setFieldValue("member", value._id);
                      else setFieldValue("member", null);
                    }}
                    blurOnSelect={handleBlur}
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
                        label="Thành viên"
                        value={values.member}
                        size="small"
                        style={{ borderRadius: "0.5rem" }}
                        error={touched.member && Boolean(errors.member)}
                        helperText={touched.member && errors.member}
                      />
                    )}
                  />
                  {values.member && (
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
                      <Button
                        variant="primary"
                        disabled={isSubmitting}
                        type="submit"
                      >
                        Xác nhận
                      </Button>
                      <Button variant="light">Đóng</Button>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default MemberForm;
