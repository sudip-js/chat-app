import React, { useState } from "react";
import {
  AuthFormFooter,
  AuthFormHeader,
  SubmitButton,
  TextInput,
} from "../../components";
import { sendEmailForResetPassword } from "../../firebase/authFunctions";
import { notify } from "../../helpers";
import { Controller, useForm } from "react-hook-form";
import { forgotPasswordSchema } from "../../schema/validationSchema";
import { forgotPasswordInitialState } from "../../initialState/formInitialState";
import { Spinner } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { EmailIcon } from "../../resources/icons";

const ForgotPassword = () => {
  const [state, setState] = useState({
    isLoading: false,
  });
  const { isLoading } = state;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: forgotPasswordInitialState,
    mode: "all",
    resolver: yupResolver(forgotPasswordSchema),
  });
  const handleSendResetPasswordEmail = async ({ email }) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    try {
      await sendEmailForResetPassword(email);
      notify({
        message: "Email sent successfully",
        type: "success",
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
                  <form onSubmit={handleSubmit(handleSendResetPasswordEmail)}>
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

                    <div className="d-grid">
                      <SubmitButton disabled={isLoading} type="submit">
                        {isLoading ? <Spinner size="sm" /> : "Send Reset Email"}
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
