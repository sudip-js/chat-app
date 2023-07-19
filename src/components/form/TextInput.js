import React from "react";

export const TextInput = ({
  label = null,
  icon: Icon = null,
  type = "text",
  placeholder = "",
}) => {
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
          type={type}
          class="form-control form-control-lg bg-light-subtle border-light"
          placeholder={placeholder}
          aria-label={placeholder}
          aria-describedby="basic-addon5"
        />
      </div>
    </>
  );
};
