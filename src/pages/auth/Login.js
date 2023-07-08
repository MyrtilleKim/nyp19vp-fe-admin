import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import BgImage from "../../assets/login.jpg";
import { Formik } from "formik";
import * as Yup from "yup";
import LoginRoutes from "routes/LoginRoutes";
import MainRoutes from "routes/MainRoutes";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <main>
      <section
        className="d-flex align-items-center bg-soft py-5 pt-lg-6 pb-lg-5"
        style={{ backgroundImage: `url(${BgImage})` }}
      >
        <Container>
          <Row className="align-items-start">
            <Col
              sm={12}
              md={10}
              lg="5"
              className="d-flex align-items-center justify-content-start"
            >
              <div
                className="bg-white shadow border rounded border-light p-4 pb-3 p-lg-5 pb-lg-4 w-100"
                style={{ maxWidth: 500 }}
              >
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">MEGOO</h3>
                </div>
                <Formik
                  validationSchema={Yup.object().shape({
                    email: Yup.string()
                      .email("Must be a valid email")
                      .max(255)
                      .required("Email is required"),
                    password: Yup.string()
                      .max(255)
                      .required("Password is required"),
                  })}
                  initialValues={{
                    email: "admin@gmail.com",
                    password: " password",
                    submit: null,
                  }}
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
                    <Form noValidate className="mb-3" onSubmit={handleSubmit}>
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
                              isInvalid={
                                !!(touched.password && errors.password)
                              }
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
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <Form.Check type="checkbox">
                            <FormCheck.Input
                              id="defaultCheck5"
                              className="me-2"
                            />
                            <FormCheck.Label
                              htmlFor="defaultCheck5"
                              className="mb-0"
                            >
                              Nhớ mật khẩu
                            </FormCheck.Label>
                          </Form.Check>
                          <Card.Link
                            href={LoginRoutes.children[1].path}
                            className="fw-bold"
                          >
                            {` Quên mật khẩu? `}
                          </Card.Link>
                        </div>
                      </Form.Group>
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-100 btn btn-login"
                      >
                        Đăng nhập
                      </Button>
                    </Form>
                  )}
                </Formik>
                <p className="text-center">
                  <Card.Link
                    as={Link}
                    to={MainRoutes.path}
                    className="text-gray-700"
                  >
                    <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Về
                    trang chủ
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

export default Login;
