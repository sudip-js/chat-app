import React from "react";
import { useNavigate } from "react-router-dom";

export const AuthFormHeader = ({ title, desc = null }) => {
  return (
    <div class="text-center mb-4">
      <h4>{title}</h4>
      {desc && <p class="text-muted mb-4">{desc}</p>}
    </div>
  );
};
export const AuthFormFooter = ({ title, linkText, link }) => {
  const navigate = useNavigate();
  return (
    <>
      <p>
        {title} <span onClick={() => navigate(link)}>{linkText}</span>{" "}
      </p>
      <p>
        By continuing, you agree to ChatBOT's Terms of Service and Privacy
        Policy, and to receive periodic emails with updates.
      </p>
    </>
  );
};
