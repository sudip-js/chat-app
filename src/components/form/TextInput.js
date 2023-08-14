import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

export const TextInput = forwardRef(
  (
    {
      label = null,
      icon: Icon = null,
      type = "text",
      placeholder = "",
      error = null,
      isForgotPassword = false,
      note = null,
      ...rest
    },
    ref
  ) => {
    return (
      <>
        {label && <label className="form-label">{label}</label>}
        <div className="input-group bg-light-subtle rounded-3  mb-0">
          {Icon && (
            <span className="input-group-text text-muted" id="basic-addon5">
              <Icon />
            </span>
          )}
          <input
            ref={ref}
            {...rest}
            type={type}
            className="form-control form-control-lg bg-light-subtle border-light"
            placeholder={placeholder}
            aria-label={placeholder}
            aria-describedby="basic-addon5"
          />
        </div>
        {error && <span className="error">{error}</span>}
      </>
    );
  }
);
