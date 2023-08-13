import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import {
  Button,
  ButtonGroup,
  Dropdown,
  Form,
  ListGroup,
} from "react-bootstrap";

const CheckboxMenu = React.forwardRef(
  (
    {
      children,
      style,
      className,
      "aria-labelledby": labeledBy,
      onSelectAll,
      onSelectNone,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={style}
        className={`${className} CheckboxMenu`}
        aria-labelledby={labeledBy}
      >
        <ListGroup style={{ maxHeight: "calc(100vh)", overflow: "none" }}>
          {children}
          <ListGroup.Item
            className="dropdown-item border-top pt-2 pb-0"
            style={{ backgroundColor: "inherit" }}
          >
            <ButtonGroup size="sm">
              <Button variant="link" onClick={onSelectAll}>
                Chọn tất cả
              </Button>
              <Button variant="link" onClick={onSelectNone}>
                Bỏ Chọn
              </Button>
            </ButtonGroup>
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
);

const CheckDropdownItem = React.forwardRef(
  ({ children, id, checked, onChange }, ref) => {
    return (
      <Form.Group
        ref={ref}
        controlId={id}
        className="dropdown-item mb-0 d-flex justify-content-between align-items-center"
      >
        <span>{children}</span>
        <Form.Check
          type="switch"
          checked={checked}
          onChange={onChange && onChange.bind(onChange, id)}
        />
      </Form.Group>
    );
  }
);

export const CheckboxDropdown = ({ items, handleAllSelect }) => {
  const handleSelectAll = () => {
    items.forEach((i) => (i.checked = true));
    handleAllSelect(true);
  };
  const handleSelectNone = () => {
    items.forEach((i) => (i.checked = false));
    handleAllSelect(false);
  };
  const handleSelect = (key, event) => {
    items.find((i) => i.id === key).checked = event.target.checked;
    items.find((i) => i.id === key).handleChecked(event.target.checked);
  };
  return (
    <Dropdown>
      <Dropdown.Toggle variant="light">
        <FontAwesomeIcon icon={faGear} />
      </Dropdown.Toggle>

      <Dropdown.Menu
        variant="light"
        as={CheckboxMenu}
        onSelectAll={handleSelectAll}
        onSelectNone={handleSelectNone}
      >
        {items.map((i) => (
          <Dropdown.Item
            key={i.id}
            as={CheckDropdownItem}
            id={i.id}
            checked={i.checked}
            onChange={handleSelect}
          >
            {i.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
