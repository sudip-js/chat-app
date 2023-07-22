import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import "./App.css";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/slices/authSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, phoneNumber, photoURL, uid } = user;
        dispatch(
          login({
            username: displayName,
            email,
            phone_number: phoneNumber,
            photo_url: photoURL,
            firebase_uid: uid,
          })
        );
        console.log("user logged In", user);
      } else {
        dispatch(logout());
        console.log("user logout", user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
