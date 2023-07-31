import React, { memo, useEffect, useState } from "react";
import SenderMessage from "./sender-message";
import ReceiverMessage from "./receiver-message";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../../../../../firebase/firebase";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { notify } from "../../../../../../helpers";
import { query } from "firebase/database";
import { GrowSpinner } from "../../../../../../components";

const ChatConversation = ({ setChatInputState, selectedUser }) => {
  const location = useLocation();
  const user = useSelector(({ auth }) => auth?.user);
  const urlQuery = new URLSearchParams(location?.search);
  const chatID = urlQuery?.get("chat_id");
  const [chatConversationState, setChatConversationState] = useState({
    isLoading: null,
    data: [],
  });
  const { isLoading, data } = chatConversationState;
  const handleState = (newState) => {
    setChatConversationState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  useEffect(() => {
    handleState({
      isLoading: true,
    });
    const messagesCollectionRef = collection(
      db,
      `users-chats/${user?.firebase_uid}/chats/${chatID}/messages`
    );
    const executeQuery = query(
      messagesCollectionRef,
      orderBy("created_at", "asc")
    );
    const unsubscribe = onSnapshot(
      executeQuery,
      (querySnapshot) => {
        let messages = [];
        querySnapshot.forEach((doc) => {
          messages.push(doc.data());
        });
        handleState({
          isLoading: false,
          data: [...messages],
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
  }, [chatID]);
  return (
    <div className="chat-conversation p-3 p-lg-4" data-simplebar="init">
      <ul className="list-unstyled mb-0">
        {isLoading ? (
          <GrowSpinner />
        ) : data && data.length ? (
          data.map((res, index) => {
            const isSenderMessage = res?.sender_id === user?.firebase_uid;

            return isSenderMessage ? (
              <SenderMessage
                key={index}
                {...{
                  ...res,
                  setChatInputState,
                }}
              />
            ) : (
              <ReceiverMessage
                key={index}
                {...res}
                selectedUser={selectedUser}
              />
            );
          })
        ) : (
          <li>
            <a>
              <h5 className="text-truncate font-size-15 mb-1">
                No messages are found. Please start conversation .
              </h5>
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

const MemoizedComponent = memo(ChatConversation);
export default MemoizedComponent;
