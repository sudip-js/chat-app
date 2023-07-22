import React from "react";
import {
  AuthFormFooter,
  AuthFormHeader,
  SubmitButton,
  TextInput,
} from "../../components";
import { PasswordIcon } from "../../resources/icons";

const ForgotPassword = () => {
  return (
    <div className="account-pages my-5 pt-sm-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <AuthFormHeader
              {...{
                title: "Forgot Your Password",
              }}
            />

            <div className="card">
              <div className="card-body p-4">
                <div className="p-3">
                  <div
                    className="alert alert-success text-center mb-4"
                    role="alert"
                  >
                    Type in your email and we'll send you a link to reset your
                    password
                  </div>
                  <form>
                    <div className="mb-3">
                      <TextInput
                        {...{
                          label: "Password",
                          icon: PasswordIcon,
                          placeholder: "Enter password",
                          type: "password",
                        }}
                      />
                    </div>

                    <div className="d-grid">
                      <SubmitButton type="submit">
                        Send Reset Email
                      </SubmitButton>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="mt-5 text-center">
              <AuthFormFooter
                {...{
                  title: "Already have an account?",
                  linkText: "Sign In",
                  link: "/",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
