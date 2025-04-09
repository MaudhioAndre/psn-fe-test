import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const NotificationToast = ({ show, onClose, message, variant }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast bg={variant} onClose={onClose} show={show} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default NotificationToast;