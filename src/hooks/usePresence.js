import { useState } from "react";
import { useEffect } from "react";
import { auth, database, db } from "../firebase/firebase";
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { onValue, ref, set } from "firebase/database";
import { Navigate } from "react-router-dom";
import { notify } from "../helpers";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

export const usePresence = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const updateUserInFirebase = (user, status) => {
    if (user) {
      getDocs(
        query(
          collection(db, "users"),
          where("firebase_uid", "==", user.uid),
          limit(1)
        )
      ).then((querySnapshot) => {
        querySnapshot.forEach((u) => {
          updateDoc(doc(db, "users", u.id), {
            online: status,
            updated_at: serverTimestamp(),
          });
        });
      });
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      console.log("here");
      updateUserInFirebase(user, false);
      setUser(null);
      localStorage.clear();
      return <Navigate to="/" />;
    } catch (error) {
      notify({
        message: error?.message ?? "Something went wrong",
        type: "error",
      });
      console.error({ error });
    }
  };

  function checkAuthStatus() {
    return new Promise((resolve, reject) => {
      try {
        onAuthStateChanged(auth, async (user) => {
          resolve(user);
          setUser(user);
          const connectedRef = ref(database, ".info/connected");
          const myConnectionsRef = ref(database, `status`);
          onValue(connectedRef, (snap) => {
            if (snap.val() === true) {
              if (user) {
                set(myConnectionsRef, "connected");
                updateUserInFirebase(user, true);
              }
            } else {
              updateUserInFirebase(user, false);
            }
            // onDisconnect(myConnectionsRef)
            //   .set("disconnected")
            //   .then(() => {
            //     updateUserInFirebase(user, false);
            //   });
          });
        });
      } catch {
        reject("api failed");
        setUser(null);
      }
    });
  }

  const getUser = async () => {
    setUserLoading(true);
    await checkAuthStatus();
    setUserLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);
  return {
    userLoading,
    user,
    logOut,
  };
};
