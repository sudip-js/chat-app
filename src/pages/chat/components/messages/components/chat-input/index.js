import React, { useState } from "react";
import { Timestamp, doc, setDoc, updateDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { db } from "../../../../../../firebase/firebase";
import { generateChatId } from "../../../../../../utils";

const initialState = {
  message: "",
  typingType: "",
};
const ChatInput = () => {
  const location = useLocation();
  const user = useSelector(({ auth }) => auth?.user);
  const query = new URLSearchParams(location?.search);
  const senderID = user?.firebase_uid;
  const receiverID = query
    .get("chat_id")
    ?.split("_")
    ?.filter((id) => id !== senderID)
    ?.at(0);
  const chatID = generateChatId(senderID, receiverID);

  const [chatInputState, setChatInputState] = useState(initialState);
  const { message, typingType } = chatInputState;
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

  const handleSendMessage = async () => {
    let tempMessage = message;
    let tempTypingType = typingType;
    if (!tempMessage) return;
    handleState({
      message: "",
      typingType: "",
    });
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

      await setDoc(senderUserMsgRef, {
        id: messageID,
        message: tempMessage,
        created_at: currentTime,
        sender_id: senderID,
        sender_email: user?.email,
        type: typingType,
      });
      await setDoc(receiverUserMsgRef, {
        id: messageID,
        message: tempMessage,
        created_at: currentTime,
        sender_id: senderID,
        sender_email: user?.email,
        type: typingType,
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
      console.log({ senderID, receiverID });
    } catch (error) {
      console.log({ error });
    }
  };
  const handleKeyDown = (e) => e.key === "Enter" && handleSendMessage();

  return (
    <div className="chat-input-section p-3 p-lg-4 border-top mb-0">
      <div className="row g-0">
        <div className="col">
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
