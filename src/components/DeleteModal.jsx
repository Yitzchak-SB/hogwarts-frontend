import React, { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import UserContext from "../context/UserContext";

function DeleteModal({ student }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { deleteStudent } = useContext(UserContext);
  const handleDelete = (event) => {
    handleClose();
    deleteStudent(event, student);
  };

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        Delete Student
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Wait!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure You Want To Delete This Student?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No, Cancel.
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Yes, Delete.
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
