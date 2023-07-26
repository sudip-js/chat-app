// UserPresence.js

import React, { useEffect } from "react";
import { ref, set, serverTimestamp, onDisconnect } from "firebase/database";
import { database } from "../../firebase/firebase";

const UserPresence = ({ userId }) => {
  useEffect(() => {
    const userStatusRef = ref(database, `/status/${userId}`);

    // Function to update the user's status to 'online' when connected
    const setOnlineStatus = () => {
      set(userStatusRef, { status: "online", last_seen: serverTimestamp() });
    };

    // Function to update the user's status to 'offline' when disconnected
    const setOfflineStatus = () => {
      set(userStatusRef, { status: "offline", last_seen: serverTimestamp() });
    };

    document.onvisibilitychange = () => {
      if (document.visibilityState === "hidden") {
        set(userStatusRef, { status: "away", last_seen: serverTimestamp() });
      } else {
        set(userStatusRef, { status: "online", last_seen: serverTimestamp() });
      }
    };

    // Set the user's status to 'online' when the component mounts
    setOnlineStatus();

    onDisconnect(userStatusRef).set({
      status: "offline",
      last_seen: serverTimestamp(),
    });

    // Set the user's status to 'offline' when the component unmounts
    return () => {
      setOfflineStatus();
    };
  }, [userId]);

  return <></>; // This component doesn't render anything visible
};

export default UserPresence;
