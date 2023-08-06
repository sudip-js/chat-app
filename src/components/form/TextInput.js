import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

export const TextInput = forwardRef(
  ({
    label = null,
    icon: Icon = null,
    type = "text",
    placeholder = "",
    error = null,
    isForgotPassword = false,
    note = null,
    ...rest
  }) => {
    const navigate = useNavigate();
    return (
      <>
        {label && <label class="form-label">{label}</label>}
        <div class="input-group bg-light-subtle rounded-3  mb-3">
          {Icon && (
            <span class="input-group-text text-muted" id="basic-addon5">
              <Icon />
            </span>
          )}
          <input
            {...rest}
            type={type}
            class="form-control form-control-lg bg-light-subtle border-light"
            placeholder={placeholder}
            aria-label={placeholder}
            aria-describedby="basic-addon5"
          />
        </div>
      </>
    );
  }
);
