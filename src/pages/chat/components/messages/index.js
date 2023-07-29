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
