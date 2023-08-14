import React, { useEffect, useState } from "react";
import { ChatConversation, ChatInput, ChatTopBar } from "./components";
import { useFetchData } from "../../../../hooks";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import NoChatFoundImage from "../../../../resources/images/no-chat-found.svg";
import { Spinner } from "react-bootstrap";
import { GrowSpinner } from "../../../../components";
import { notify } from "../../../../helpers";

const initialState = {
  message: "",
  typingType: "",
  isEditMessage: false,
  isEditMessageID: "",
  isShowEmojiPicker: false,
  emoji: "",
  emoji_id: "",
  emoji_name: "",
  attachments: [],
  isShowAttachmentsModal: false,
  isLoadingAttachments: false,
  isShowAudioRecordModal: false,
  isLoadingAudioRecord: false,
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false,
  initRecordingVideo: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: [],
  isShowVideoRecordModal: false,
  isTyping: false,
  videoMediaStream: null,
  isChatExist: false,
  isChatExistLoader: false,
};
const Messages = () => {
  const location = useLocation();
  const user = useSelector(({ auth }) => auth?.user);
  const [chatInputState, setChatInputState] = useState(initialState);
  const { isChatExist, isChatExistLoader } = chatInputState;
  const query = new URLSearchParams(location?.search);
  const senderID = user?.firebase_uid;
  const receiverID = query
    .get("chat_id")
    ?.split("_")
    .filter((id) => id !== senderID)
    ?.at(0);
  const chatID = query?.get("chat_id");
  const { data } = useFetchData({
    collectionRef: "users-chats",
  });
  const selectedUser = data?.find((res) => res?.firebase_uid === receiverID);

  const handleState = (newState) => {
    setChatInputState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const handleCheckChatExist = async () => {
    if (!location?.search) return;
    handleState({
      isChatExistLoader: true,
    });
    try {
      const senderUserMsgEditRef = doc(
        db,
        `users-chats/${senderID}/chats/${chatID}`
      );
      const receiverUserMsgEditRef = doc(
        db,
        `users-chats/${receiverID}/chats/${chatID}`
      );
      const senderUserSnap = await getDoc(senderUserMsgEditRef);
      const receiverUserSnap = await getDoc(receiverUserMsgEditRef);

      if (senderUserSnap.exists() && receiverUserSnap.exists()) {
        handleState({
          isChatExist: true,
          isChatExistLoader: false,
        });
      } else {
        handleState({
          isChatExist: false,
          isChatExistLoader: false,
        });
      }
    } catch (error) {
      console.error({ error });
      notify({
        message: error?.message ?? "Something Went Wrong!",
        type: "error",
      });

      handleState({
        isChatExist: false,
        isChatExistLoader: false,
      });
    }
  };

  useEffect(() => {
    handleCheckChatExist();
  }, [location?.search]);

  if (isChatExistLoader) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <GrowSpinner />
      </div>
    );
  }

  return (
    <>
      {isChatExist ? (
        <div className="w-100 overflow-hidden position-relative">
          <ChatTopBar
            {...{
              selectedUser,
            }}
          />
          <ChatConversation
            {...{
              setChatInputState,
              selectedUser,
            }}
          />
          <ChatInput
            {...{
              chatInputState,
              setChatInputState,
            }}
          />
        </div>
      ) : (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            width: "100vw",
            height: "100vh",
          }}
        >
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <h1> Unknown Channel</h1>
            <img
              src={NoChatFoundImage}
              style={{
                width: "100%",
              }}
              alt="Start Conversation"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Messages;
