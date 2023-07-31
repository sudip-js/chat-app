import React, { useRef } from "react";
import { Timestamp, doc, setDoc, updateDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { useSelector } from "react-redux";
import { auth, db, storage } from "../../../../../../firebase/firebase";
import { useGetChatID } from "../../../../../../hooks";
import {
  ClearIcon,
  MicIcon,
  VideoIcon,
} from "../../../../../../resources/icons";
import Modal from "../../../../../../components/misc/Modal";
import Picker from "emoji-picker-react";
import { insertAtCursor } from "../../../../../../utils";
import PreviewFile from "../preview-file";
import { onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { GrowSpinner } from "../../../../../../components";
import { AudioRecording } from "../recording";

const audioRecordingInitialState = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: [],
};

const ChatInput = ({ chatInputState, setChatInputState }) => {
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const user = useSelector(({ auth }) => auth?.user);
  const { senderID, receiverID, chatID } = useGetChatID();
  const {
    message,
    typingType,
    isEditMessage,
    isEditMessageID,
    isShowEmojiPicker,
    attachments,
    isShowAttachmentsModal,
    isLoadingAttachments,
    isShowAudioRecordModal,
    isLoadingAudioRecord,
    audio,
  } = chatInputState;
  const handleState = (newState) => {
    setChatInputState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };
  const handleOnChange = (e) => {
    const value = e.target.value;
    handleState({
      message: value,
      typingType: "typing-text",
    });
  };
  const handleChangeFile = (e) => {
    const files = e.target.files;
    if (!files) return;
    handleState({
      isShowAttachmentsModal: true,
      attachments: [...attachments, ...files],
    });
  };
  const handleClearEdit = () => {
    handleState({
      isEditMessage: false,
      isEditMessageID: "",
      message: "",
    });
  };
  const onEmojiClick = ({ emoji }) => {
    if (!emoji) return;
    const ref = inputRef?.current;
    if (!ref) return;
    insertAtCursor({ ref, data: emoji });
    handleState({
      message: inputRef?.current?.value,
      isShowEmojiPicker: false,
    });

    ref.focus();
  };

  const handleUploadMedia = ({ file, message }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const currentTime = Timestamp.now();
        const messageID = uuidv4();
        const senderUserRef = doc(db, `users-chats/${senderID}/chats`, chatID);
        const receiverUserRef = doc(
          db,
          `users-chats/${receiverID}/chats`,
          chatID
        );
        const senderUserMsgRef = doc(
          db,
          `users-chats/${senderID}/chats/${chatID}/messages`,
          messageID
        );
        const receiverUserMsgRef = doc(
          db,
          `users-chats/${receiverID}/chats/${chatID}/messages`,
          messageID
        );

        const storageRef = ref(storage, `media/${chatID}/${messageID}`);
        const response = await uploadBytes(storageRef, file, {
          contentType: file?.type ?? "",
        });
        const url = await getDownloadURL(
          ref(storage, response?.metadata?.fullPath)
        );
        await setDoc(senderUserMsgRef, {
          id: messageID,
          message: url,
          created_at: currentTime,
          sender_id: senderID,
          sender_email: user?.email,
          type: response?.metadata?.contentType,
          file_ame: file?.name ?? "",
          is_edit: false,
        });
        await setDoc(receiverUserMsgRef, {
          id: messageID,
          message: url,
          created_at: currentTime,
          sender_id: senderID,
          sender_email: user?.email,
          type: response?.metadata?.contentType,
          file_ame: file?.name ?? "",
          is_edit: false,
        });
        await updateDoc(senderUserRef, {
          last_info: {
            time: Timestamp.now(),
            last_message: message,
            type: response?.metadata?.contentType,
          },
          should_notify: true,
          send_by: senderID,
        });
        await updateDoc(receiverUserRef, {
          last_info: {
            time: Timestamp.now(),
            last_message: message,
            type: response?.metadata?.contentType,
          },
          should_notify: true,
          send_by: senderID,
        });
        resolve();
      } catch (error) {
        reject(new Error(error));
      }
    });
  };

  const handleSendMessage = async () => {
    const currentTime = Timestamp.now();
    let tempMessage = message;
    let tempTypingType = typingType;
    let tempIsEditMessage = isEditMessage;
    let tempIsEditMessageID = isEditMessageID;
    handleState({
      message: "",
      typingType: "",
      isEditMessage: false,
      isEditMessageID: "",
    });
    try {
      if (Array.isArray(attachments) && attachments.length) {
        handleState({
          isLoadingAttachments: true,
        });

        onAuthStateChanged(auth, async (userResponse) => {
          if (userResponse) {
            for (let file of attachments) {
              await handleUploadMedia({ file, message });
            }
          }
          if (fileInputRef?.current?.value) {
            fileInputRef.current.value = null;
          }
          handleState({
            isLoadingAttachments: false,
            attachments: [],
          });
        });
      }
      if (Array.isArray(audio) && audio.length) {
        handleState({
          isLoadingAudioRecord: true,
        });

        onAuthStateChanged(auth, async (userResponse) => {
          if (userResponse) {
            for (let file of audio) {
              await handleUploadMedia({ file, message });
            }
          }
          handleState({
            isLoadingAudioRecord: false,
            isShowAudioRecordModal: false,
            audio: [],
          });
        });
      }

      if (!tempMessage) return;
      if (tempIsEditMessage) {
        const senderUserMsgEditRef = doc(
          db,
          `users-chats/${senderID}/chats/${chatID}/messages`,
          tempIsEditMessageID
        );
        const receiverUserMsgEditRef = doc(
          db,
          `users-chats/${receiverID}/chats/${chatID}/messages`,
          tempIsEditMessageID
        );

        await updateDoc(senderUserMsgEditRef, {
          message: tempMessage,
          is_edit: true,
          created_at: currentTime,
        });
        await updateDoc(receiverUserMsgEditRef, {
          message: tempMessage,
          is_edit: true,
          created_at: currentTime,
        });
      } else {
        const messageID = uuidv4();
        const senderUserRef = doc(db, `users-chats/${senderID}/chats`, chatID);
        const receiverUserRef = doc(
          db,
          `users-chats/${receiverID}/chats`,
          chatID
        );
        const senderUserMsgRef = doc(
          db,
          `users-chats/${senderID}/chats/${chatID}/messages`,
          messageID
        );
        const receiverUserMsgRef = doc(
          db,
          `users-chats/${receiverID}/chats/${chatID}/messages`,
          messageID
        );
        await setDoc(senderUserMsgRef, {
          id: messageID,
          message: tempMessage,
          created_at: currentTime,
          sender_id: senderID,
          sender_email: user?.email,
          type: tempTypingType,
          is_edit: false,
        });
        await setDoc(receiverUserMsgRef, {
          id: messageID,
          message: tempMessage,
          created_at: currentTime,
          sender_id: senderID,
          sender_email: user?.email,
          type: tempTypingType,
          is_edit: false,
        });
        await updateDoc(senderUserRef, {
          last_info: {
            time: Timestamp.now(),
            last_message: tempMessage,
            type: tempTypingType,
          },
          should_notify: true,
          send_by: senderID,
        });
        await updateDoc(receiverUserRef, {
          last_info: {
            time: Timestamp.now(),
            last_message: tempMessage,
            type: tempTypingType,
          },
          should_notify: true,
          send_by: senderID,
        });
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const handleRecordAudio = (type) => {
    if (type === "submit") {
      handleSendMessage();
    } else {
      handleState({
        isShowAudioRecordModal: false,
        audio: [],
      });
    }
  };

  const handleKeyDown = (e) => e.key === "Enter" && handleSendMessage();

  return (
    <>
      <div
        className="chat-input-section p-3 p-lg-4 border-top mb-0"
        style={{
          position: "relative",
        }}
      >
        <div className="row g-0">
          <div className="col">
            {isEditMessage && message && (
              <ClearIcon
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "0px",
                }}
                className="large-font text-red cursor--pointer"
                onClick={handleClearEdit}
              />
            )}
            {isLoadingAttachments && (
              <span
                style={{
                  position: "absolute",
                  top: "3px",
                  left: "25px",
                }}
              >
                <GrowSpinner />
              </span>
            )}

            <input
              ref={inputRef}
              name="message"
              className="form-control form-control-lg bg-light border-light"
              placeholder="Enter Message..."
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
              value={message}
            />
          </div>
          <div className="col-auto">
            <div className="chat-input-links ms-md-2 me-md-0">
              <ul className="list-inline mb-0">
                <li
                  className="list-inline-item"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Emoji"
                >
                  <button
                    type="button"
                    className="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect"
                    onClick={() =>
                      handleState({
                        isShowEmojiPicker: true,
                      })
                    }
                  >
                    <i className="ri-emotion-happy-line"></i>
                  </button>
                </li>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleChangeFile}
                  multiple
                  hidden
                />
                <li
                  className="list-inline-item"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Audio Record"
                >
                  <button
                    type="button"
                    className="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect"
                    onClick={() =>
                      handleState({
                        isShowAudioRecordModal: true,
                      })
                    }
                  >
                    <MicIcon />
                  </button>
                </li>
                <li
                  className="list-inline-item"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Audio Record"
                >
                  <button
                    type="button"
                    className="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect"
                    onClick={() =>
                      handleState({
                        isShowVideoRecordModal: true,
                      })
                    }
                  >
                    <VideoIcon />
                  </button>
                </li>
                <li
                  className="list-inline-item"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Attached File"
                >
                  <button
                    type="button"
                    className="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect"
                    onClick={() => fileInputRef?.current?.click()}
                  >
                    <i className="ri-attachment-line"></i>
                  </button>
                </li>
                <li className="list-inline-item">
                  <button
                    type="type"
                    className="btn btn-primary font-size-16 btn-lg chat-send waves-effect waves-light"
                    onClick={handleSendMessage}
                  >
                    <i className="ri-send-plane-2-fill"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Modal
        {...{
          show: isShowEmojiPicker,
          title: "Select Emoji",
          submitText: "Submit",
          hide: () => {
            handleState({
              isShowEmojiPicker: false,
            });
          },
        }}
      >
        <Picker width="100%" onEmojiClick={onEmojiClick} />
      </Modal>
      <Modal
        {...{
          show: isShowAttachmentsModal,
          title: "Selected File",
          submitText: "Submit",
          hide: () => {
            handleState({
              isShowAttachmentsModal: false,
            });
          },
        }}
      >
        <PreviewFile
          {...{
            attachments,
            setChatInputState,
          }}
        />
      </Modal>
      <Modal
        {...{
          show: isShowAudioRecordModal,
          title: "Record Audio",
          submitText: "Upload",
          hide: handleRecordAudio,
          isLoading: isLoadingAudioRecord,
          isDisabled: !Boolean(audio?.length),
        }}
      >
        <AudioRecording
          {...{
            chatInputState,
            setChatInputState,
            audioRecordingInitialState,
          }}
        />
      </Modal>
    </>
  );
};

export default ChatInput;
