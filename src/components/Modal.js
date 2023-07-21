import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

// export interface ModalClasses {}

const Modals = forwardRef(({ title, children, show, handleClose, classes }) => {
  return (
    <Modal show={show} onHide={handleClose} scrollable>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleClose} className="">
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

Modals.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  show: PropTypes.bool,
  children: PropTypes.node,
  handleClose: PropTypes.func,
};

export default Modals;
