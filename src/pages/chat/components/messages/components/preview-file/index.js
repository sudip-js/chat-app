import React, { useRef, useState } from "react";
import { ClearIcon } from "../../../../../../resources/icons";
import TestVideo from "../../../../../../resources/videos/test-video.mp4";

const PreviewFile = ({ attachments, setChatInputState }) => {
  return (
    <div className="container">
      <div className="row row-cols-2">
        {Array.isArray(attachments) && attachments.length ? (
          attachments.map((file, index) => {
            return (
              <div
                key={index}
                className="col"
                style={{
                  position: "relative",
                  padding: "10px",
                }}
              >
                <Attachments
                  {...{
                    file,
                    index,
                    attachments,
                    setChatInputState,
                  }}
                />
              </div>
            );
          })
        ) : (
          <span>No attachment are found!</span>
        )}
      </div>
    </div>
  );
};

export default PreviewFile;

const Attachments = ({ file, index, attachments, setChatInputState }) => {
  const [state, setState] = useState({
    imagePreviewURL: null,
  });
  const { imagePreviewURL } = state;
  const handleState = (newState) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };
  const removeAttachments = ({ index }) => {
    setChatInputState((prevState) => ({
      ...prevState,
      attachments: attachments.filter((_, idx) => idx !== index),
    }));
  };

  const closeButton = () => (
    <span
      style={{
        position: "absolute",
        top: "10px",
        right: "9px",
        background: "white",
        padding: "10px",
        color: "black",
        cursor: "pointer",
      }}
      onClick={() => removeAttachments({ index })}
    >
      <ClearIcon className="extra-large-font" />
    </span>
  );
  if (!file) return;
  if (file.type.includes("image")) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", (e) =>
      handleState({
        imagePreviewURL: e.target.result,
      })
    );
    return (
      <>
        <img
          src={imagePreviewURL}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "15rem",
          }}
        />
        {closeButton()}
      </>
    );
  }
  if (file.type.includes("video")) {
    return (
      <>
        <video
          style={{
            height: "100%",
            width: "100%",
          }}
          controls
        >
          <source src={URL.createObjectURL(file)} type={file?.type} />
          Your browser does not support the video tag.
        </video>
        {closeButton()}
      </>
    );
  }

  return (
    <>
      {/* <img
        src={TestImage}
        style={{
          objectFit: "cover",
        }}
      />
      <span
        style={{
          position: "absolute",
          top: "10px",
          right: "9px",
          background: "white",
          padding: "10px",
          color: "black",
          cursor: "pointer",
        }}
      >
        <ClearIcon className="extra-large-font" />
      </span> */}
      <h1>Unsupported file....</h1>
    </>
  );
};
