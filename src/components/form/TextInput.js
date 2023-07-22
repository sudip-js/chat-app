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
      ...rest
    },
    ref
  ) => {
    const navigate = useNavigate();
    return (
      <>
        <div className="d-flex align-items-center justify-content-between">
          {label && <label className="form-label">{label}</label>}{" "}
          {isForgotPassword && (
            <label
              onClick={() => navigate("/forgot-password")}
              className="form-label cursor-pointer"
            >
              Forgot Password?
            </label>
          )}
        </div>
        <div className="input-group bg-light-subtle rounded-3">
          {Icon && (
            <span className="input-group-text text-muted" id="basic-addon5">
              <Icon />
            </span>
          )}
          <input
            ref={ref}
            type={type}
            className="form-control form-control-lg bg-light-subtle border-light"
            placeholder={placeholder}
            aria-label={placeholder}
            {...rest}
          />
        </div>
        {error && <span className="error">{error}</span>}
      </>
    );
  }
);
