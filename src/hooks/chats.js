import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Timestamp,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { db, storage } from "../firebase/firebase";
import { notify } from "../helpers";
import { uuidv4 } from "@firebase/util";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const initialState = {
  isLoading: false,
  data: [],
};

export const useFetchData = ({ collectionRef }) => {
  const user = useSelector(({ auth }) => auth.user);
  const [state, setState] = useState(initialState);
  const { isLoading, data } = state;
  const handleState = (newState) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };
  useEffect(() => {
    handleState({
      isLoading: true,
    });
    const usersCollectionRef = collection(db, collectionRef);
    const executeQuery = query(
      usersCollectionRef,
      where("firebase_uid", "!=", user?.firebase_uid)
    );
    const unsubscribe = onSnapshot(
      executeQuery,
      (querySnapshot) => {
        let tempUsers = [];
        querySnapshot.forEach((doc) => {
          tempUsers.push(doc.data());
        });
        handleState({
          isLoading: false,
          data: [...tempUsers],
        });
      },
      (error) => {
        console.error({ error: error });
        notify({
          message: "ERROR:Failed to fetch users.Please try again later.",
          type: "error",
        });
      }
    );

    return () => unsubscribe();
  }, []);

  return {
    isLoading,
    data,
  };
};

export const useGetChatID = () => {
  const location = useLocation();
  const user = useSelector(({ auth }) => auth?.user);
  const query = new URLSearchParams(location?.search);
  const senderID = user?.firebase_uid;
  const receiverID = query
    .get("chat_id")
    ?.split("_")
    ?.filter((id) => id !== senderID)
    ?.at(0);
  const chatID = [senderID, receiverID]?.sort()?.join("_");
  return {
    senderID,
    receiverID,
    chatID,
    user,
  };
};

export const useUploadDataToFirebase = () => {
  const { chatID, receiverID, senderID, user } = useGetChatID();
  const onSubmit = ({ file = null, message = "" }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const currentTime = Timestamp.now();
        const messageID = uuidv4();
        const senderUserRef = doc(db, `users-chats/${senderID}/chats`, chatID);
        const receiverUserRef = doc(
          db,
          `users-chats/${receiverID}/chats`,
          chatID
        );
        const senderUserMsgRef = doc(
          db,
          `users-chats/${senderID}/chats/${chatID}/messages`,
          messageID
        );
        const receiverUserMsgRef = doc(
          db,
          `users-chats/${receiverID}/chats/${chatID}/messages`,
          messageID
        );

        const storageRef = ref(storage, `media/${chatID}/${messageID}`);
        const response = await uploadBytes(storageRef, file, {
          contentType: file?.type ?? "",
        });
        const url = await getDownloadURL(
          ref(storage, response?.metadata?.fullPath)
        );
        await setDoc(senderUserMsgRef, {
          id: messageID,
          message: url,
          created_at: currentTime,
          sender_id: senderID,
          sender_email: user?.email,
          type: response?.metadata?.contentType,
          file_name: file?.name ?? "",
          is_edit: false,
        });
        await setDoc(receiverUserMsgRef, {
          id: messageID,
          message: url,
          created_at: currentTime,
          sender_id: senderID,
          sender_email: user?.email,
          type: response?.metadata?.contentType,
          file_name: file?.name ?? "",
          is_edit: false,
        });
        await updateDoc(senderUserRef, {
          last_info: {
            time: Timestamp.now(),
            last_message: message,
            type: response?.metadata?.contentType,
          },
          should_notify: true,
          send_by: senderID,
        });
        await updateDoc(receiverUserRef, {
          last_info: {
            time: Timestamp.now(),
            last_message: message,
            type: response?.metadata?.contentType,
          },
          should_notify: true,
          send_by: senderID,
        });
        resolve();
      } catch (error) {
        reject(new Error(error));
      }
    });
  };
  return {
    onSubmit,
  };
};
