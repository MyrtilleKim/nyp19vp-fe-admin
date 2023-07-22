import { useState, useEffect } from "react";

// bootstrap
import {
  Form,
  InputGroup,
  Button,
  Row,
  Col,
  ProgressBar,
} from "react-bootstrap";

// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faUnlockAlt,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

// third party
import moment from "moment-timezone";
import Datetime from "react-datetime";

// project import
import { strengthColor, strengthIndicator } from "utils/password-strength";

export const SampleGroupForm = ({
  title,
  icon,
  name,
  classes,
  type,
  placeholder,
  required = false,
  readOnly = false,
  disabled = false,
  handleBlur,
  handleChange,
  touched,
  values,
  errors,
}) => {
  return (
    <Form.Group id={name} className={classes?.formGroup}>
      <Form.Label className={classes?.formLabel}>{title}</Form.Label>
      <InputGroup>
        <InputGroup.Text>
          <FontAwesomeIcon icon={icon} />
        </InputGroup.Text>
        <Form.Control
          className={classes?.formControl}
          required={required}
          readOnly={readOnly}
          disabled={disabled}
          type={type}
          value={values[name]}
          placeholder={placeholder}
          name={name}
          onBlur={handleBlur}
          onChange={handleChange}
          isInvalid={!!(touched[name] && errors[name])}
        />
        <Form.Control.Feedback type="invalid">
          {errors[name]}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
};

export const DateGroupForm = ({
  title,
  name,
  classes,
  required = false,
  handleBlur,
  handleChange,
  touched,
  values,
  errors,
}) => {
  const [birthday, setBirthday] = useState(values[name]);
  return (
    <Form.Group id={name} className={classes?.formGroup}>
      <Form.Label className={classes?.formLabel}>{title}</Form.Label>
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
              value={birthday ? moment(birthday).format("DD/MM/YYYY") : ""}
              required={required}
              name={name}
              placeholder="dd/mm/yyyy"
              onFocus={openCalendar}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!(touched[name] && errors[name])}
            />
            <Form.Control.Feedback type="invalid">
              {errors[name]}
            </Form.Control.Feedback>
          </InputGroup>
        )}
      />
    </Form.Group>
  );
};

export const PasswordGroupForm = ({
  title,
  name,
  classes,
  handleBlur,
  handleChange,
  touched,
  values,
  errors,
  checkStrength = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [level, setLevel] = useState();
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword("");
  }, []);
  return (
    <Form.Group id="password" className={classes?.formGroup}>
      <Form.Label className={classes?.formLabel}>{title}</Form.Label>
      <InputGroup>
        <InputGroup.Text>
          <FontAwesomeIcon icon={faUnlockAlt} />
        </InputGroup.Text>
        <Form.Control
          className={classes?.formControl}
          required
          type={showPassword ? "text" : "password"}
          value={values[name]}
          placeholder="Password"
          name={name}
          onBlur={handleBlur}
          onChange={
            !checkStrength
              ? handleChange
              : (e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }
          }
          isInvalid={!!(touched[name] && errors[name])}
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
          {errors[name]}
        </Form.Control.Feedback>
      </InputGroup>
      {checkStrength && touched[name] && (
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
          <Col className="align-items-center justify-content-center" sm={4}>
            <small>
              <b>{level?.label}</b>
            </small>
          </Col>
        </Row>
      )}
    </Form.Group>
  );
};
