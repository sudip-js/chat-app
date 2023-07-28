import React from "react";

const Dropdown = ({ actions }) => {
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
        {actions &&
          actions?.length > 0 &&
          actions.map(({ id, label, icon: Icon, cta }) => {
            return (
              <a key={id} onClick={cta} className="dropdown-item">
                {label}
                <Icon className="float-end text-muted extra-large-font cursor--pointer" />
              </a>
            );
          })}
      </div>
    </div>
  );
};

export default Dropdown;
