import { useState, useEffect, useRef } from "react";

// bootstrap
import {
  Form,
  InputGroup,
  Button,
  Col,
  ProgressBar,
  Stack,
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
import CurrencyInput from "react-currency-input-field";
import { Field } from "formik";

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

export const CurrencyGroupForm = ({
  title,
  icon,
  name,
  classes,
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
        <CurrencyInput
          id={name}
          name={name}
          className={`form-control ${classes?.formControl} ${
            touched[name] && errors[name] ? "is-invalid" : ""
          }`}
          onValueChange={(value) => {
            handleChange(name, value);
          }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values[name]}
          required={required}
          readOnly={readOnly}
          disabled={disabled}
          decimalsLimit={0}
          placeholder={placeholder}
          intlConfig={{ locale: "vi-VN", currency: "VND" }}
          step={1}
        />
        {touched[name] && errors[name] && (
          <Form.Control.Feedback type="invalid">
            {errors[name]}
          </Form.Control.Feedback>
        )}
      </InputGroup>
    </Form.Group>
  );
};

export const DateGroupForm = ({
  title,
  name,
  classes,
  required = false,
  readOnly = false,
  disabled = false,
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
              className={classes?.formControl}
              type="text"
              value={birthday ? moment(birthday).format("DD/MM/YYYY") : ""}
              required={required}
              readOnly={readOnly}
              disabled={disabled}
              name={name}
              placeholder="dd/mm/yyyy"
              onFocus={openCalendar}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched[name] && !!errors[name]}
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

export const BulletedTextArea = ({
  title,
  name,
  classes,
  required = false,
  readOnly = false,
  disabled = false,
  handleBlur,
  handleChange,
  touched,
  values,
  errors,
}) => {
  const inputRef = useRef(null);
  const bullet = "\u2022";
  const bulletWithSpace = `${bullet} `;
  const [formattedValue, setFormattedValue] = useState(values[name]);

  const _onKeyDown = (e) => {
    const { value, selectionStart } = e.target;
    if (e.keyCode === 13) {
      e.target.value = [...value]
        .map((c, i) => (i === selectionStart - 1 ? `\n${bulletWithSpace}` : c))
        .join("");
      e.target.selectionStart = selectionStart + bulletWithSpace.length;
      e.target.selectionEnd = selectionStart + bulletWithSpace.length;
      e.preventDefault();
      e.stopPropagation();
    }
    if (value[0] !== bullet) {
      e.target.value = `${bulletWithSpace}${value}`;
    }
  };
  return (
    <Form.Group id={name} className={classes?.formGroup}>
      <Form.Label className={classes?.formLabel}>{title}</Form.Label>
      <Form.Control
        ref={inputRef}
        as="textarea"
        placeholder=""
        required={required}
        readOnly={readOnly}
        disabled={disabled}
        style={{ height: "4rem" }}
        onKeyDown={_onKeyDown}
        value={
          formattedValue && Array.isArray(formattedValue)
            ? bulletWithSpace +
              formattedValue.join(`\n${bulletWithSpace}`) +
              " "
            : formattedValue
        }
        onBlur={handleBlur}
        onChange={(e) => {
          let value = e.target.value;
          setFormattedValue(value);
          value = value.split(`\n${bulletWithSpace}`);
          value[0] = value[0].substring(2);
          handleChange(name, value);
        }}
        isInvalid={touched[name] && !!errors[name]}
      />
      <Form.Control.Feedback type="invalid">
        {errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export const CheckboxGroupForm = ({
  title,
  icon,
  name,
  nameCheckbox,
  labelCheckbox,
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
        <InputGroup.Checkbox
          as={Field}
          type="checkbox"
          name={nameCheckbox}
          checked={values[nameCheckbox]}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched[nameCheckbox] && !!errors[nameCheckbox]}
        />
        <span className="label-checkbox pt-2 pe-2">{labelCheckbox}</span>
        <Form.Control.Feedback type="invalid">
          {errors[name]}
          {errors[nameCheckbox]}
        </Form.Control.Feedback>
      </InputGroup>
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
        <Stack direction="horizontal">
          <Col className="align-items-center justify-content-center mt-1 me-1">
            <ProgressBar
              now={level?.percentage}
              variant={level?.color}
              style={{ height: "8px" }}
            />
          </Col>
          <small>
            <b>{level?.label}</b>
          </small>
        </Stack>
      )}
    </Form.Group>
  );
};
