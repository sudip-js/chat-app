import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./redux/slices/authSlice";
import "./App.css";
import { doc, onSnapshot } from "firebase/firestore";
import moment from "moment";
import { usePresence } from "./hooks";
import { notify } from "./helpers";

const App = () => {
  const dispatch = useDispatch();
  const { userLoading } = usePresence();
  const user = useSelector(({ auth }) => auth?.user);
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
      } else {
        dispatch(logout());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    let unsubscribe = null;
    let formattedDate = null;

    if (user) {
      const docRef = doc(db, `users/${user?.firebase_uid}`);
      unsubscribe = onSnapshot(
        docRef,
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            const { create_at = null, ...rest } = data;
            if (create_at?.seconds) {
              const momentObj = moment.unix(create_at?.seconds);
              formattedDate = momentObj.format("DD/MM/YYYY HH:mm:ss");
            }
            dispatch(
              login({
                create_at: formattedDate,
                ...rest,
              })
            );
          } else {
            console.error("Document not found in Firestore.");
            notify({
              message: "Document not found in Firestore.",
              type: "error",
            });
          }
        },
        (error) => {
          console.error("Error getting real-time updates:", error);
          notify({
            message: error?.message ?? "Something Went Wrong!",
            type: "error",
          });
        }
      );
    }

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
