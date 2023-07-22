import React from "react";

export const SubmitButton = ({ children, type = "button", ...rest }) => {
  return (
    <button
      {...rest}
      className="btn btn-primary waves-effect waves-light"
      type={type}
    >
      {children}
    </button>
  );
};

export const SocialAuthButton = ({ Icon, title, extraParams }) => {
  const { className, onClick } = extraParams;
  return (
    <button
      className={`${className} btn w-100 d-flex align-items-center justify-content-center gap-2 h-1`}
      onClick={onClick}
    >
      <Icon />
      <span>{title}</span>
    </button>
  );
};
