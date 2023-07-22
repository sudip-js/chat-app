import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  verifyPasswordResetCode,
} from "firebase/auth";
import { auth, githubProvider, googleProvider } from "./firebase";

export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};
export const loginWithGithub = () => {
  return signInWithPopup(auth, githubProvider);
};
export const signUpWithEmail = (...arg) => {
  return createUserWithEmailAndPassword(auth, ...arg);
};
export const signInWithEmail = (...arg) => {
  return signInWithEmailAndPassword(auth, ...arg);
};
export const sendEmailForResetPassword = (...arg) => {
  return sendPasswordResetEmail(auth, ...arg);
};
export const verifyResetPasswordCode = (...arg) => {
  return verifyPasswordResetCode(auth, ...arg);
};
export const confirmResetPassword = (...arg) => {
  return confirmPasswordReset(auth, ...arg);
};
export const updateProfileInFirebase = (...arg) => {
  return updateProfile(...arg);
};
