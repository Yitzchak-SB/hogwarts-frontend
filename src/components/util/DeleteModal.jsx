import React, { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import UserContext from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

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
      <Button className="button-color" onClick={handleShow}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Wait!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure You Want To Delete This Student?</Modal.Body>
        <Modal.Footer>
          <Button className="button-color" onClick={handleClose}>
            No, Cancel.
          </Button>
          <Button className="button-color" onClick={handleDelete}>
            Yes, Delete.
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
