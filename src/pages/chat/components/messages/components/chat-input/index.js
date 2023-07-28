import React from "react";
import { Timestamp, doc, setDoc, updateDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { useSelector } from "react-redux";
import { db } from "../../../../../../firebase/firebase";
import { useGetChatID } from "../../../../../../hooks";
import { ClearIcon } from "../../../../../../resources/icons";

const ChatInput = ({ chatInputState, setChatInputState }) => {
  console.log({ chatInputState });
  const user = useSelector(({ auth }) => auth?.user);
  const { senderID, receiverID, chatID } = useGetChatID();
  const { message, typingType, isEditMessage, isEditMessageID } =
    chatInputState;

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
  const handleClearEdit = () => {
    handleState({
      isEditMessage: false,
      isEditMessageID: "",
      message: "",
    });
  };
  const handleSendMessage = async () => {
    let tempMessage = message;
    let tempTypingType = typingType;
    let tempIsEditMessage = isEditMessage;
    let tempIsEditMessageID = isEditMessageID;
    if (!tempMessage) return;
    handleState({
      message: "",
      typingType: "",
      isEditMessage: false,
      isEditMessageID: "",
    });
    try {
      const currentTime = Timestamp.now();
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
          isEdit: true,
          created_at: currentTime,
        });
        await updateDoc(receiverUserMsgEditRef, {
          message: tempMessage,
          isEdit: true,
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
          type: typingType,
          isEdit: false,
        });
        await setDoc(receiverUserMsgRef, {
          id: messageID,
          message: tempMessage,
          created_at: currentTime,
          sender_id: senderID,
          sender_email: user?.email,
          type: typingType,
          isEdit: false,
        });
        await updateDoc(senderUserRef, {
          last_info: {
            time: Timestamp.now(),
            last_message: tempMessage,
            type: typingType,
          },
          should_notify: true,
          send_by: senderID,
        });
        await updateDoc(receiverUserRef, {
          last_info: {
            time: Timestamp.now(),
            last_message: tempMessage,
            type: typingType,
          },
          should_notify: true,
          send_by: senderID,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };
  const handleKeyDown = (e) => e.key === "Enter" && handleSendMessage();

  return (
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

          <input
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
                >
                  <i className="ri-emotion-happy-line"></i>
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
  );
};

export default ChatInput;
