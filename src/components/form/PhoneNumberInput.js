import React, { forwardRef } from "react";
import PhoneInput from "react-phone-number-input";

export const PhoneNumberInput = forwardRef(
  (
    {
      label = null,
      icon: Icon = null,
      type = "text",
      placeholder = "",
      error = null,
      isError = null,
      onChange,
      ...rest
    },
    ref
  ) => {
    return (
      <>
        <div className="d-flex align-items-center justify-content-between">
          {label && <label className="form-label">{label}</label>}{" "}
        </div>
        <div className="input-group bg-light-subtle rounded-3">
          {Icon && (
            <span className="input-group-text text-muted" id="basic-addon5">
              <Icon />
            </span>
          )}
          <PhoneInput
            {...rest}
            ref={ref}
            defaultCountry={"US"}
            international={true}
            addInternationalOption={false}
            withCountryCallingCode={true}
            internationalIcon={() => (
              <span>
                <i className="fa fa-phone  icon-circle bg-danger"></i>
              </span>
            )}
            type="text"
            name="phone"
            className="form-control"
            limitMaxLength={13}
            onChange={onChange}
          />
        </div>
        {(error || !!isError) && (
          <span className="error">{error || isError}</span>
        )}
      </>
    );
  }
);
