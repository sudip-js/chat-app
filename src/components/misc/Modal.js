import React from "react";
import { Modal as BootstrapModal, Spinner } from "react-bootstrap";

const Modal = ({
  show,
  hide,
  submitText,
  title,
  children,
  isLoading = null,
  isDisabled = undefined,
  extraParams = null,
}) => {
  console.log({ isDisabled });
  return (
    <BootstrapModal
      show={show}
      onHide={hide}
      backdrop="static"
      keyboard={false}
      size={extraParams?.size ?? undefined}
    >
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
      {extraParams?.showFooter && (
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-danger w-25"
            onClick={() => hide("cancel")}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary w-25"
            onClick={() => hide("submit")}
            disabled={isDisabled || isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : submitText}
          </button>
        </div>
      )}
    </BootstrapModal>
  );
};

export default Modal;
