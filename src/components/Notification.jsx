import React, { useState, useEffect, useContext } from "react";
import Toast from "react-bootstrap/Toast";
import UserContext from "../context/UserContext";

const Notification = () => {
  const [toast, setToast] = useState(false);
  const handleToast = () => setToast(!toast);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setTimeout(() => handleToast(), 1500);
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "200px" }}>
      <Toast
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "350px",
        }}
        show={toast}
        animation={true}
        onClose={handleToast}
        autohide={true}
        delay={4500}
      >
        <Toast.Header>
          <img src={user._image_url} className="rounded mr-2" alt="" />
          <strong className="mr-auto">Welcome Back!</strong>
          <small>{`${user._first_name} ${user._last_name}`}</small>
        </Toast.Header>
        <Toast.Body>Have a Magical Day!!</Toast.Body>
      </Toast>
    </div>
  );
};

export default Notification;
