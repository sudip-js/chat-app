import * as yup from "yup";

const username = yup
  .string()
  .required("Username is required")
  .min(3, "Username must be 3-20 characters long")
  .max(20, "Username must be 3-20 characters long");
const email = yup
  .string()
  .required("Email is required")
  .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Must be valid email")
  .max(50, "Email must be 50 characters long");
const password = yup
  .string()
  .required("Password is required")
  .min(6, "Password must be 6-15 characters long")
  .max(15, "Password must be 6-15 characters long");

export const signUpSchema = yup.object({
  username,
  email,
  password,
});
export const signInSchema = yup.object({
  email,
  password,
});
export const forgotPasswordSchema = yup.object({
  email,
});
export const resetPasswordSchema = yup.object({
  password,
});
