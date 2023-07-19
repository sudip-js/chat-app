import React from "react";
import {
  AuthFormFooter,
  AuthFormHeader,
  SubmitButton,
  TextInput,
} from "../../components";
import { PasswordIcon } from "../../resources/icons";

const ResetPassword = () => {
  return (
    <div class="account-pages my-5 pt-sm-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <AuthFormHeader
              {...{
                title: "Reset Your Password",
              }}
            />

            <div class="card">
              <div class="card-body p-4">
                <div class="p-3">
                  <form>
                    <div class="mb-3">
                      <TextInput
                        {...{
                          label: "Password",
                          icon: PasswordIcon,
                          placeholder: "Enter password",
                          type: "password",
                        }}
                      />
                    </div>

                    <div class="d-grid">
                      <SubmitButton type="submit">Reset Password</SubmitButton>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div class="mt-5 text-center">
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

export default ResetPassword;
