import React from "react";
import {
  AuthFormFooter,
  AuthFormHeader,
  SubmitButton,
  TextInput,
} from "../../components";
import { EmailIcon, PasswordIcon } from "../../resources/icons";

const SignIn = () => {
  return (
    <div class="account-pages my-5 pt-sm-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <AuthFormHeader
              {...{
                title: "Welcome back",
                desc: "Sign in to your account",
              }}
            />

            <div class="card">
              <div class="card-body p-4">
                <div class="p-3">
                  <form>
                    <div class="mb-3">
                      <TextInput
                        {...{
                          label: "Email",
                          icon: EmailIcon,
                          placeholder: "Enter email",
                        }}
                      />
                    </div>
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
                      <SubmitButton type="submit">Sign In</SubmitButton>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div class="mt-5 text-center">
              <AuthFormFooter
                {...{
                  title: "Don't have an account?",
                  linkText: "Sign Up",
                  link: "/sign-up",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
