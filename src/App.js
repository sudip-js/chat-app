import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./redux/slices/authSlice";
import { UserPresence } from "./components";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth?.user);
  console.log({ user });
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("here");
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
      } else {
        dispatch(logout());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
      {user?.firebase_uid && <UserPresence userId={user?.firebase_uid} />}
    </>
  );
};

export default App;
