import { doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firebase/firebase";
import { useState } from "react";
import { notify } from "../helpers";

export const usePresenceStatus = ({ userID }) => {
  const [presenceData, setPresenceData] = useState(null);
  useEffect(() => {
    if (!userID) return;
    const docRef = doc(db, `users/${userID}`);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const res = docSnapshot.data();
          if (res) {
            setPresenceData({
              online: res?.online ?? false,
              lastSeen: res?.updated_at?.seconds ?? serverTimestamp(),
            });
          }
        } else {
          console.error("Users not found");
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

    return () => {
      unsubscribe();
    };
  }, [userID]);

  return {
    presenceData,
  };
};
