import React from "react";
import { Modal as BootstrapModal } from "react-bootstrap";

const Modal = ({ show, hide, submitText, title, children }) => {
  return (
    <BootstrapModal show={show} onHide={hide}>
      <div className="modal-header">
        <h5
          className="modal-title font-size-16 text-center w-100"
          id="addContact-exampleModalLabel"
        >
          {title}
        </h5>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={hide}
        ></button>
      </div>
      <div
        className="modal-body p-4"
        style={{
          maxHeight: "calc(100vh - 210px)",
          overflowY: "auto",
        }}
      >
        {children}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" onClick={hide}>
          Close
        </button>
        <button type="button" className="btn btn-primary" onClick={hide}>
          {submitText}
        </button>
      </div>
    </BootstrapModal>
  );
};

export default Modal;
