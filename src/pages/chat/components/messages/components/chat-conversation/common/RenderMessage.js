import React from "react";

const RenderMessage = ({ data }) => {
  const { message, type, file_ame = "" } = data;
  if (type.includes("image")) {
    return (
      <img
        className="cursor--pointer"
        src={message}
        alt={`${file_ame}(Error)`}
        style={{
          objectFit: "contain",
          height: "360px",
          maxWidth: "360px",
        }}
      />
    );
  }

  if (type?.includes("video")) {
    return (
      <video
        style={{
          height: "360px",
          maxWidth: "360px",
        }}
        src={message}
        controls
      >
        <h6>Your browser does not support the video tag.</h6>
      </video>
    );
  }
  return <p className="mb-0">{message}</p>;
};

export default RenderMessage;
