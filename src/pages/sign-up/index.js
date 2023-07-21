import React from "react";
import {
  AuthFormFooter,
  AuthFormHeader,
  SubmitButton,
  TextInput,
} from "../../components";
import {
  EmailIcon,
  GoogleIcon,
  PasswordIcon,
  UserIcon,
} from "../../resources/icons";

const SignUp = () => {
  return (
    <div class="account-pages my-5 pt-sm-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <AuthFormHeader
              {...{
                title: "Get started",
                desc: "Create a new account",
              }}
            />

            <div class="card">
              <div class="card-body p-4">
                <div class="p-3">
                  <button className="btn text-center bg-white w-100">
                    <GoogleIcon />
                    <span>Continue with Google</span>
                  </button>
                  <span className="text-center w-100">OR</span>
                  <form>
                    <div class="mb-3">
                      <TextInput
                        {...{
                          label: "Username",
                          icon: UserIcon,
                          placeholder: "Enter username",
                        }}
                      />
                    </div>
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
                      <SubmitButton type="submit">Sign Up</SubmitButton>
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

export default SignUp;
