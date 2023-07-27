import React from "react";
import SenderMessage from "./sender-message";
import ReceiverMessage from "./receiver-message";

const ChatConversation = () => {
  return (
    <div className="chat-conversation p-3 p-lg-4" data-simplebar="init">
      <ul className="list-unstyled mb-0">
        <SenderMessage />
      </ul>
    </div>
  );
};

export default ChatConversation;
