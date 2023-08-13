import React, { useState } from "react";
import { ClearIcon, SendIcon } from "../../../../../../resources/icons";
import { useUploadDataToFirebase } from "../../../../../../hooks/chats";
import { Spinner } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../../../firebase/firebase";
import { forwardRef } from "react";

const PreviewFile = forwardRef(({ attachments, setChatInputState }, ref) => {
  const { onSubmit } = useUploadDataToFirebase();
  const [isLoading, setIsLoading] = useState(false);
  const handleSendAttachments = async () => {
    try {
      if (Array.isArray(attachments) && attachments.length) {
        setIsLoading(true);
        onAuthStateChanged(auth, async (userResponse) => {
          if (userResponse) {
            for (let file of attachments) {
              await onSubmit({ file });
            }
          }
          if (ref?.current?.value) {
            ref.current.value = null;
          }
          setIsLoading(false);
          setChatInputState((prev) => ({
            ...prev,
            isShowAttachmentsModal: false,
            attachments: [],
          }));
        });
      }
    } catch (error) {
      setIsLoading(false);
      setChatInputState((prev) => ({
        ...prev,
        isShowAttachmentsModal: false,
        attachments: [],
      }));
    }
  };
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
                    isLoading,
                  }}
                />
              </div>
            );
          })
        ) : (
          <span>No attachment are found!</span>
        )}
      </div>
      <button
        type="button"
        className="btn btn-success w-100"
        onClick={handleSendAttachments}
      >
        {isLoading ? (
          <Spinner size="sm" />
        ) : (
          <span>
            Send <SendIcon className="extra-large-font" />
          </span>
        )}
      </button>
    </div>
  );
});

export default PreviewFile;

const Attachments = ({
  file,
  index,
  attachments,
  setChatInputState,
  isLoading,
}) => {
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
    <button
      style={{
        position: "absolute",
        top: "10px",
        right: "9px",
        background: "white",
        padding: "10px",
        color: "red",
      }}
      className="btn"
      onClick={() => removeAttachments({ index })}
      disabled={isLoading}
    >
      <ClearIcon className="extra-large-font" />
    </button>
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
          alt="Preview Image"
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
