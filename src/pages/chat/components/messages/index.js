import React from "react";
import { ChatConversation, ChatInput, ChatTopBar } from "./components";
const Messages = () => {
  return (
    <div className="w-100 overflow-hidden position-relative">
      <ChatTopBar />
      <ChatConversation />
      <ChatInput />
    </div>
  );
};

export default Messages;
