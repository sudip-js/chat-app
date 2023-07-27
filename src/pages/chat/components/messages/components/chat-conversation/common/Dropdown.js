import React from "react";

const Dropdown = () => {
  return (
    <div className="dropdown align-self-start">
      <a
        className="dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="ri-more-2-fill"></i>
      </a>
      <div className="dropdown-menu">
        <a className="dropdown-item" href="#">
          Copy <i className="ri-file-copy-line float-end text-muted"></i>
        </a>
        <a className="dropdown-item" href="#">
          Save <i className="ri-save-line float-end text-muted"></i>
        </a>
        <a className="dropdown-item" href="#">
          Forward <i className="ri-chat-forward-line float-end text-muted"></i>
        </a>
        <a className="dropdown-item" href="#">
          Delete <i className="ri-delete-bin-line float-end text-muted"></i>
        </a>
      </div>
    </div>
  );
};

export default Dropdown;
