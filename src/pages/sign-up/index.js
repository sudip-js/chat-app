import React, { useState } from "react";
import {
  AuthFormFooter,
  AuthFormHeader,
  SocialAuthButton,
  SubmitButton,
  TextInput,
} from "../../components";
import {
  EmailIcon,
  GithubIcon,
  GoogleIcon,
  PasswordIcon,
  UserIcon,
} from "../../resources/icons";
import {
  signUpWithEmail,
  updateProfileInFirebase,
} from "../../firebase/authFunctions";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../schema";
import { signUpInitialState } from "../../initialState/formInitialState";
import { notify } from "../../helpers";
import { Spinner } from "react-bootstrap";
import { handleLoginWithProvider } from "../../helpers/authHelper";

const SignUp = () => {
  const [state, setState] = useState({
    isLoading: false,
  });
  const { isLoading } = state;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: signUpInitialState,
    mode: "all",
    resolver: yupResolver(signUpSchema),
  });

  const handleSocialAuth = async (provider) => {
    const result = await handleLoginWithProvider(provider);
    if (result.response) {
      console.log("Login successful:", result.response);
    } else {
      console.log("Login failed:", result.error);
    }
  };

  const handleSignUpWithEmail = async ({ username, email, password }) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    try {
      const userCredential = await signUpWithEmail(email, password);
      await updateProfileInFirebase(userCredential?.user, {
        displayName: username,
      });
    } catch (error) {
      notify({
        message: error?.message,
        type: "error",
      });
      console.log({ error: error?.message });
    } finally {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  return (
    <div className="account-pages my-5 pt-sm-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <AuthFormHeader
              {...{
                title: "Get started",
                desc: "Create a new account",
              }}
            />

            <div className="card">
              <div className="card-body p-4">
                <div className="p-3">
                  <div className="d-flex align-items-center flex-column gap-2 mb-2">
                    <SocialAuthButton
                      {...{
                        Icon: GoogleIcon,
                        title: "Continue with Google",
                        extraParams: {
                          className: "text-black bg-white",
                          onClick: () => handleSocialAuth("google"),
                        },
                      }}
                    />
                    <SocialAuthButton
                      {...{
                        Icon: GithubIcon,
                        title: "Continue with Github",
                        extraParams: {
                          className: "text-white bg-black",
                          onClick: () => handleSocialAuth("github"),
                        },
                      }}
                    />
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="text-white">OR</span>
                  </div>
                  <form onSubmit={handleSubmit(handleSignUpWithEmail)}>
                    <div className="mb-3">
                      <Controller
                        name="username"
                        control={control}
                        render={({ field }) => (
                          <TextInput
                            {...{
                              ...field,
                              label: "Username",
                              icon: UserIcon,
                              placeholder: "Enter username",
                              error: errors?.username?.message,
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className="mb-3">
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <TextInput
                            {...{
                              ...field,
                              label: "Email",
                              icon: EmailIcon,
                              placeholder: "Enter email",
                              error: errors?.email?.message,
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className="mb-3">
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <TextInput
                            {...{
                              ...field,
                              label: "Password",
                              icon: PasswordIcon,
                              placeholder: "Enter password",
                              type: "password",
                              error: errors?.password?.message,
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className="d-grid">
                      <SubmitButton disabled={isLoading} type="submit">
                        {isLoading ? <Spinner size="sm" /> : "Sign Up"}
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

export default SignUp;
