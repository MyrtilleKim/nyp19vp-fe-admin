import React, { forwardRef, useState, useRef } from "react";

import moment from "moment-timezone";
import Datetime from "react-datetime";

// bootstrap
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
  Image,
} from "react-bootstrap";

// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCameraAlt } from "@fortawesome/free-solid-svg-icons";

const ProfileForm = forwardRef((props, ref) => {
  const { userInfo } = props;
  const [birthday, setBirthday] = useState("");
  const [avatar, setAvatar] = useState(userInfo.avatar);
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };
  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    console.log("fileObj is", fileObj);

    setAvatar(URL.createObjectURL(event.target.files[0]));

    // 👇️ reset file input
    event.target.value = null;

    // 👇️ is now empty
    console.log(event.target.files);
  };
  return (
    <Card ref={ref} border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">
          <b>Thông tin cá nhân</b>
        </h5>
        <Row className="justify-content-center align-items-start">
          <Col xs={12} sm={5} md={4}>
            <div
              style={{ height: "auto", width: "200px" }}
              className="position-relative mx-auto"
            >
              <Image
                src={avatar}
                className="user-avatar profile-avatar mx-auto"
                thumbnail
              />
              <input
                type="file"
                style={{ display: "none" }}
                ref={inputRef}
                onChange={handleFileChange}
              />
              <Button
                className="position-absolute bottom-10 end-10 rounded-circle text-center"
                onClick={handleClick}
                variant="light"
                style={{
                  height: "30px",
                  width: "30px",
                  padding: "0 1px 0 1px",
                }}
              >
                <FontAwesomeIcon icon={faCameraAlt} />
              </Button>
            </div>
          </Col>
          <Col xs={12} sm={7} md={8}>
            <Form>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group id="name">
                    <Form.Label>Họ & Tên</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Nhập Họ & Tên"
                      defaultValue={userInfo.name}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="birthday">
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
                              birthday
                                ? moment(birthday).format("DD/MM/YYYY")
                                : ""
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
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group id="emal">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="name@company.com"
                      defaultValue={userInfo.email}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="phone">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      type="phone"
                      placeholder="0000 000 000"
                      defaultValue={userInfo.phone}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="mt-3">
                <Button variant="primary" type="submit">
                  Xác nhận
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
});

export default ProfileForm;
