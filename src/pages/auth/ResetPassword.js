import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faEye,
  faEyeSlash,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  Container,
  InputGroup,
  ProgressBar,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { strengthColor, strengthIndicator } from "utils/password-strength";
import LoginRoutes from "routes/LoginRoutes";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [showRePassword, setShowRePassword] = useState(false);
  const handleClickShowRePassword = () => {
    setShowRePassword(!showRePassword);
  };
  const handleMouseDownRePassword = (event) => {
    event.preventDefault();
  };

  const [level, setLevel] = useState();

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword("");
  }, []);

  return (
    <main>
      <section className="d-flex align-items-center py-5 pt-lg-6 pb-lg-5 bg-soft">
        <Container>
          <Row className="justify-content-center">
            <Col
              sm={12}
              md={10}
              lg="5"
              className="d-flex align-items-center justify-content-center"
            >
              <div
                className="bg-white shadow border rounded border-light p-4 pb-3 p-lg-5 pb-lg-4 w-100"
                style={{ maxWidth: 440 }}
              >
                <h3 className="mb-4">Đặt lại mật khẩu</h3>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                    re_password: "",
                    submit: null,
                  }}
                  validate={(values) => {
                    const errors = {};
                    if (values.password !== values.re_password) {
                      errors.re_password = "Mật khẩu không trùng khớp";
                    }
                    if (level?.color === "danger") {
                      errors.password = "Mật khẩu quá yếu";
                    }
                    return errors;
                  }}
                  validationSchema={Yup.object().shape({
                    email: Yup.string()
                      .email("Email không hợp lệ")
                      .max(255)
                      .required("Bắt buộc"),
                    password: Yup.string().max(255).required("Bắt buộc"),
                    re_password: Yup.string().max(255).required("Bắt buộc"),
                  })}
                  onSubmit={async (
                    values,
                    { setErrors, setStatus, setSubmitting }
                  ) => {
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
                    <Form noValidate onSubmit={handleSubmit}>
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
                            onChange={(e) => {
                              handleChange(e);
                              changePassword(e.target.value);
                            }}
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
                        {touched.password && (
                          <Row className="justify-content-center">
                            <Col
                              className="align-items-center justify-content-center mt-2"
                              sm={8}
                            >
                              <ProgressBar
                                now={level?.percentage}
                                variant={level?.color}
                                style={{ height: "8px" }}
                              />
                            </Col>
                            <Col
                              className="align-items-center justify-content-center"
                              sm={4}
                            >
                              <small>
                                <b>{level?.label}</b>
                              </small>
                            </Col>
                          </Row>
                        )}
                      </Form.Group>
                      <Form.Group id="re_password" className="mb-4">
                        <Form.Label>Xác nhận mật khẩu</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faUnlockAlt} />
                          </InputGroup.Text>
                          <Form.Control
                            className="input-button-group"
                            required
                            type={showRePassword ? "text" : "password"}
                            value={values.re_password}
                            placeholder="Password"
                            name="re_password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            isInvalid={
                              !!(touched.re_password && errors.re_password)
                            }
                          />
                          <Button
                            variant="outline-secondary"
                            id="button-repassword"
                            onClick={handleClickShowRePassword}
                            onMouseDown={handleMouseDownRePassword}
                          >
                            {showRePassword ? (
                              <FontAwesomeIcon icon={faEye} />
                            ) : (
                              <FontAwesomeIcon icon={faEyeSlash} />
                            )}
                          </Button>
                          <Form.Control.Feedback type="invalid">
                            {errors.re_password}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-100 btn-login"
                      >
                        Xác nhận
                      </Button>
                    </Form>
                  )}
                </Formik>
                <br></br>
                <p className="text-center">
                  <Card.Link
                    href={LoginRoutes.children[0].path}
                    className="text-gray-700"
                  >
                    <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Về
                    trang đăng nhập
                  </Card.Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
export default ResetPassword;
