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
} from "../../resources/icons";
import { Controller, useForm } from "react-hook-form";
import { signInInitialState } from "../../initialState/formInitialState";
import { signInSchema } from "../../schema/validationSchema";
import { handleLoginWithProvider } from "../../helpers/authHelper";
import { signInWithEmail } from "../../firebase/authFunctions";
import { notify } from "../../helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { Spinner } from "react-bootstrap";

const SignIn = () => {
  const [state, setState] = useState({
    isLoading: false,
  });
  const { isLoading } = state;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: signInInitialState,
    mode: "all",
    resolver: yupResolver(signInSchema),
  });

  const handleSocialAuth = async (provider) => {
    const result = await handleLoginWithProvider(provider);
    if (result.response) {
      console.log("Login successful:", result.response);
    } else {
      notify({
        message: result.error,
        type: "error",
      });
      console.log("Login failed:", result.error);
    }
  };

  const handleSignInWithEmail = async ({ email, password }) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    try {
      const response = await signInWithEmail(email, password);
      console.log({ response });
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
                title: "Welcome back",
                desc: "Sign in to your account",
              }}
            />

            <div className="card">
              <div className="card-body p-4">
                <div className="p-3">
                  <form onSubmit={handleSubmit(handleSignInWithEmail)}>
                    <div className="mb-3">
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
                              isForgotPassword: true,
                              error: errors?.password?.message,
                            }}
                          />
                        )}
                      />
                    </div>

                    <div className="d-grid">
                      <SubmitButton disabled={isLoading} type="submit">
                        {isLoading ? <Spinner size="sm" /> : "Sign In"}
                      </SubmitButton>
                    </div>
                  </form>
                  <div className="d-flex align-items-center justify-content-center my-2">
                    <span className="text-white">OR</span>
                  </div>
                  <div className="d-flex align-items-center flex-column gap-2">
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
                </div>
              </div>
            </div>

            <div className="mt-5 text-center">
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
