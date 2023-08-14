import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { useGetChatID } from "../../../../hooks";
import { GrowSpinner } from "../../../spinner";
import { PlusIcon } from "../../../../resources/icons";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { useDispatch } from "react-redux";
import { setTypingStatus } from "../../../../redux/slices/chatSlice";
import { notify } from "../../../../helpers";

const initialState = {
  isLoading: false,
  data: [],
};

const ChatMessagesList = ({ handleOpenModal = () => null }) => {
  const dispatch = useDispatch();
  const { user } = useGetChatID();
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
    try {
      const qq = query(
        collection(db, `users-chats/${user?.firebase_uid}/chats`)
      );
      const unsubscribe = onSnapshot(qq, (querySnapshot) => {
        if (!querySnapshot.empty) {
          let chats = [];
          let typingStatus = [];
          querySnapshot.forEach((doc) => {
            chats.push(doc.data());
            typingStatus.push({
              isTyping: doc?.data()?.is_typing,
              whoIsTypingId: doc?.data()?.who_is_typing_id,
              whoIsTypingName: doc?.data()?.who_is_typing_name,
              firebaseUid: doc?.data()?.firebase_uid,
            });
          });

          handleState({
            isLoading: false,
            data: [...chats],
          });
          dispatch(setTypingStatus([...typingStatus]));
        } else {
          handleState({
            isLoading: false,
            data: [],
          });
        }
      });

      return () => {
        unsubscribe();
      };
    } catch (error) {
      handleState({
        isLoading: false,
        data: [],
      });
      console.error({ error });
      notify({
        message: error?.message ?? "Something Went Wrong!",
        type: "error",
      });
    }
  }, []);

  return (
    <div>
      <div className="d-flex align-items-center mb-3 px-3 justify-content-between">
        <h5 className="mb-0 font-size-16 text-uppercase">Direct Messages</h5>
        <PlusIcon
          onClick={handleOpenModal}
          className="large-font cursor--pointer text-green"
        />
      </div>
      <div className="chat-message-list px-2" data-simplebar>
        <ul className="list-unstyled chat-list chat-user-list">
          {isLoading ? (
            <GrowSpinner />
          ) : data?.length ? (
            data.map((user) => {
              return (
                <ListItem
                  key={user?.firebase_uid}
                  {...{
                    ...user,
                  }}
                />
              );
            })
          ) : (
            <li>
              <a>
                <h5 className="text-truncate font-size-15 mb-1">
                  No users are found please try again later.
                </h5>
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ChatMessagesList;
