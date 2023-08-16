import React, { useRef, useState } from "react";
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
  ProfileIcon,
  UserIcon,
} from "../../resources/icons";
import { signUpWithEmail } from "../../firebase/authFunctions";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../schema";
import { signUpInitialState } from "../../initialState/formInitialState";
import { notify } from "../../helpers";
import { Spinner } from "react-bootstrap";
import { handleLoginWithProvider } from "../../helpers/authHelper";
import { useAuth } from "../../hooks/useAuth";

const initialState = {
  isLoading: false,
};
const SignUp = () => {
  const { handleAddUser } = useAuth();
  const photoURLRef = useRef(null);
  const [state, setState] = useState(initialState);
  const { isLoading } = state;
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: signUpInitialState,
    mode: "all",
    resolver: yupResolver(signUpSchema),
  });

  const watchPhotoURL = watch("photo_url");

  const handleSocialAuth = async (provider) => {
    try {
      const result = await handleLoginWithProvider(provider);
      handleAddUser({
        userCredential: result?.response,
      });
    } catch (error) {
      notify({
        message: error?.message,
        type: "error",
      });
    }
  };

  const handleChangePhotoURL = (e) => {
    const photo_url = e.target.files[0];
    setValue("photo_url", photo_url);
  };

  const handleSignUpWithEmail = async ({
    username,
    email,
    password,
    photo_url,
  }) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    try {
      const userCredential = await signUpWithEmail(email, password);
      handleAddUser({
        userCredential,
        username,
        photo_url,
      });
    } catch (error) {
      notify({
        message: error?.message,
        type: "error",
      });
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

                      <div className="mt-3">
                        <div className="input-group">
                          <label
                            htmlFor="photo_url"
                            className="d-flex align-items-center gap-2 cursor--pointer"
                          >
                            <ProfileIcon />
                            {watchPhotoURL ? (
                              <span>{watchPhotoURL?.name}</span>
                            ) : (
                              <span>Upload Profile Picture</span>
                            )}
                          </label>

                          <input
                            ref={photoURLRef}
                            onChange={handleChangePhotoURL}
                            id="photo_url"
                            type="file"
                            hidden
                          />
                        </div>
                      </div>
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
