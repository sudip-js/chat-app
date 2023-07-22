import * as yup from "yup";

export const signUpSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .required("Email is required")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Must be valid email"),
  password: yup.string().required("Password is required"),
});
export const signInSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Must be valid email"),
  password: yup.string().required("Password is required"),
});
export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Must be valid email"),
});
export const resetPasswordSchema = yup.object({
  password: yup.string().required("Password is required"),
});
