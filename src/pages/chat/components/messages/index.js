import React, { useState } from "react";
import { ChatConversation, ChatInput, ChatTopBar } from "./components";
import { useFetchData } from "../../../../hooks";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

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
  mediaStream: null,
  mediaRecorder: null,
  audio: [],
  isShowVideoRecordModal: false,
  video: [],
};
const Messages = () => {
  const [chatInputState, setChatInputState] = useState(initialState);

  const { data } = useFetchData({
    collectionRef: "users-chats",
  });
  const location = useLocation();
  const user = useSelector(({ auth }) => auth?.user);
  const query = new URLSearchParams(location?.search);
  const receiverID = query
    .get("chat_id")
    ?.split("_")
    .filter((id) => id !== user?.firebase_uid)
    ?.at(0);
  const selectedUser = data?.find((res) => res?.firebase_uid === receiverID);
  console.log({ selectedUser });

  return (
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
  );
};

export default Messages;
