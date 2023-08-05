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
    const navigate = useNavigate();
    return (
      <>
        <div className="d-flex flex-column justify-content-between">
          {label && <label className="form-label">{label}</label>}{" "}
          {note && <p className="form-label mb-1 text-white">{note}</p>}{" "}
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
          {type === "text" && (
            <input
              ref={ref}
              type={type}
              className="form-control form-control-lg bg-light-subtle border-light"
              placeholder={placeholder}
              aria-label={placeholder}
              {...rest}
            />
          )}
          {type === "textarea" && (
            <textarea
              ref={ref}
              type={type}
              className="form-control form-control-lg bg-light-subtle border-light"
              placeholder={placeholder}
              aria-label={placeholder}
              {...rest}
              rows="4"
              cols="50"
            />
          )}
        </div>
        {error && <span className="error">{error}</span>}
      </>
    );
  }
);
