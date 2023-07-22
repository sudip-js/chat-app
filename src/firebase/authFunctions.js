import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
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
