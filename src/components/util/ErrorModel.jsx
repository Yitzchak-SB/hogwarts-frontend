import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function ErrorModal({ title, message, footer }) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button className="button-color" onClick={handleClose}>
            {footer}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ErrorModal;
