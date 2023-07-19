import React from "react";

export const SubmitButton = ({ children, type = "button" }) => {
  return (
    <button class="btn btn-primary waves-effect waves-light" type={type}>
      {children}
    </button>
  );
};
