import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

// third party
import * as Yup from "yup";
import { Formik } from "formik";
import { HttpStatusCode } from "axios";

// bootstrap
import { Col, Row, Card, Form, Button, Container } from "react-bootstrap";

// assets
import {
  faEnvelope,
  faAddressCard,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";

import { SampleGroupForm, DateGroupForm } from "./GroupForm";
import AvatarForm from "./AvatarForm";
import Alerts from "components/Alerts";
import Modals from "components/Modal";
import { updateInfoUser } from "store/requests/user";
import { createAxios } from "http/createInstance";
import { loginSuccess } from "store/reducers/auth";

const ProfileForm = (props) => {
  const { userInfo } = props;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state?.auth.login);
  let axiosJWT = createAxios(currentUser, dispatch, loginSuccess);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [classes, setClasses] = useState({
    alertVariant: "danger",
    alertClass: "fixed-top mx-auto",
  });
  const [values, setValues] = useState(null);
  const [initValues, setInitValues] = useState({
    name: userInfo.name,
    dob: userInfo.dob,
    phone: userInfo.phone,
    email: userInfo.email,
    submit: null,
  });
  useEffect(() => {
    setInitValues({
      name: userInfo.name,
      dob: userInfo.dob,
      phone: userInfo.phone,
      email: userInfo.email,
      submit: null,
    });
  }, [userInfo]);
  const handleAlert = (title, content, variant) => {
    setTitle(title);
    setContent(content);
    setClasses({
      alertVariant: variant,
      alertClass: "fixed-top mx-auto",
    });
  };
  const handleConfirm = async () => {
    setShowModal(false);
    let formData = { name: values.name };
    if (values.phone) formData.phone = values.phone;
    if (values.dob) formData.dob = values.dob;
    console.log(formData, values.dob);
    const res = await updateInfoUser(
      userInfo._id,
      currentUser?.accessToken,
      formData,
      dispatch,
      axiosJWT
    );
    if (res.statusCode === HttpStatusCode.Ok) {
      setContent("Cập nhật thông tin cá nhân thành công");
      setTitle("Thành công");
      setClasses({
        alertVariant: "success",
        alertClass: "fixed-top mx-auto",
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
    } else {
      setContent(res.message);
      setTitle("Lỗi");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
    }
  };
  const handleClose = () => {
    setShowAlert(false);
    setShowModal(false);
  };
  const phoneRegExp = /(\+84|84|0)+([3|5|7|8|9])+([0-9]{8})\b/;
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
      <Container>
        <Row className="justify-content-center align-items-start">
          <Col xs={12} xl={4}>
            <AvatarForm
              user={userInfo}
              handleAlert={handleAlert}
              currentUser={currentUser}
              dispatch={dispatch}
              axiosJWT={axiosJWT}
            />
          </Col>
          <Col xs={12} xl={8}>
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">
                  <b>Thông tin cá nhân</b>
                </h5>
                <Formik
                  validationSchema={Yup.object().shape({
                    name: Yup.string().max(255).required("Bắt buộc"),
                    phone: Yup.string().matches(
                      phoneRegExp,
                      "Số điện thoại không hợp lệ"
                    ),
                  })}
                  initialValues={initValues}
                  enableReinitialize
                  onSubmit={async (
                    values,
                    { setErrors, setStatus, setSubmitting }
                  ) => {
                    try {
                      setStatus({ success: false });
                      setSubmitting(false);
                      if (!_.isEqual(values, initValues)) {
                        setValues(values);
                        setContent("Bạn muốn cập nhật thông tin?");
                        setShowModal(true);
                      } else {
                        setContent("Không có gì thay đổi");
                        setTitle("Thông báo");
                        setClasses({
                          alertVariant: "info",
                          alertClass: "fixed-top mx-auto",
                        });
                        setShowAlert(true);
                        setTimeout(() => {
                          handleClose();
                        }, 1000);
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
                  }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <Row>
                        <Col md={6} className="mb-3">
                          <SampleGroupForm
                            title="Họ & Tên"
                            icon={faAddressCard}
                            name="name"
                            type="text"
                            placeholder="Nhập Họ & Tên"
                            classes={{ formControl: "input-out-button-group" }}
                            required={true}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            touched={touched}
                            errors={errors}
                            values={values}
                          />
                        </Col>
                        <Col md={6} className="mb-3">
                          <DateGroupForm
                            title="Ngày sinh"
                            name="birthday"
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            touched={touched}
                            errors={errors}
                            values={values}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} className="mb-3">
                          <SampleGroupForm
                            title="Email"
                            icon={faEnvelope}
                            name="email"
                            type="email"
                            classes={{ formControl: "input-out-button-group" }}
                            placeholder="Nhập Email"
                            required={true}
                            readOnly={true}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            touched={touched}
                            errors={errors}
                            values={values}
                          />
                        </Col>
                        <Col md={6} className="mb-3">
                          <SampleGroupForm
                            title="Số điện thoại"
                            icon={faPhoneAlt}
                            name="phone"
                            type="text"
                            required={false}
                            classes={{ formControl: "input-out-button-group" }}
                            placeholder="Nhập số điện thoại"
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            touched={touched}
                            errors={errors}
                            values={values}
                          />
                        </Col>
                      </Row>
                      <div className="mt-3 text-end">
                        <Button
                          variant="primary"
                          disabled={isSubmitting}
                          type="submit"
                        >
                          Xác nhận
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileForm;
