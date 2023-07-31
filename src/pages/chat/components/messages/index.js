import React, { useState } from "react";
import { ChatConversation, ChatInput, ChatTopBar } from "./components";

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
  return (
    <div className="w-100 overflow-hidden position-relative">
      <ChatTopBar />
      <ChatConversation
        {...{
          setChatInputState,
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
