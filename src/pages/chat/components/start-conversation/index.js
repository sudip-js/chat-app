import React from "react";
import StartConversationImage from "../../../../resources/images/start-conversation-image.svg";

const StartConversation = () => {
  return (
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
        <button className="btn bg-white text-black extra-large-font">
          Start Conversation
        </button>
        <img
          src={StartConversationImage}
          style={{
            width: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default StartConversation;
