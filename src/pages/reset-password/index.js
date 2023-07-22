import React, { useEffect, useState } from "react";
import {
  AuthFormFooter,
  AuthFormHeader,
  SubmitButton,
  TextInput,
} from "../../components";
import { PasswordIcon } from "../../resources/icons";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { resetPasswordInitialState } from "../../initialState/formInitialState";
import { resetPasswordSchema } from "../../schema/validationSchema";
import {
  confirmResetPassword,
  verifyResetPasswordCode,
} from "../../firebase/authFunctions";
import { notify } from "../../helpers";
import { Spinner } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location?.search);
  const oobCode = urlParams.get("oobCode");

  const [state, setState] = useState({
    isLoading: false,
  });
  const { isLoading } = state;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: resetPasswordInitialState,
    mode: "all",
    resolver: yupResolver(resetPasswordSchema),
  });
  const handleUpdatePassword = async ({ password }) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    try {
      await verifyResetPasswordCode(oobCode);
      await confirmResetPassword(oobCode, password);
      notify({
        message: "Password updated successfully",
        type: "success",
      });
      navigate("/");
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
                title: "Reset Your Password",
              }}
            />

            <div className="card">
              <div className="card-body p-4">
                <div className="p-3">
                  <form onSubmit={handleSubmit(handleUpdatePassword)}>
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
                        {isLoading ? <Spinner size="sm" /> : "Reset Password"}
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

export default ResetPassword;
