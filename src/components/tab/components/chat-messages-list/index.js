import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { useGetChatID } from "../../../../hooks";
import { GrowSpinner } from "../../../spinner";
import { PlusIcon } from "../../../../resources/icons";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";

const initialState = {
  isLoading: false,
  data: [],
  isTyping: false,
  whoIsTypingId: null,
};

const ChatMessagesList = ({ handleOpenModal = () => null }) => {
  const { user, receiverID, chatID } = useGetChatID();
  const [state, setState] = useState(initialState);
  const { isTyping, whoIsTypingId } = state;
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
          querySnapshot.forEach((doc) => {
            chats.push(doc.data());
          });
          handleState({
            isLoading: false,
            data: [...chats],
          });
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
    }
  }, []);

  useEffect(() => {
    try {
      if (receiverID) {
        const unsubscribe = onSnapshot(
          doc(db, `users-chats/${user.firebase_uid}/chat`, chatID),
          (doc) => {
            if (doc.exists) {
              handleState({
                isTyping: doc.data()?.is_typing,
                whoIsTypingId: doc.data()?.who_is_typing_id,
              });
            }
          }
        );
        return () => {
          unsubscribe();
        };
      }
    } catch (error) {
      console.error({ error });
    }
  }, [receiverID]);
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
              console.log({ user });
              return (
                <ListItem
                  key={user?.firebase_uid}
                  {...{
                    ...user,
                    isTyping,
                    whoIsTypingId,
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
