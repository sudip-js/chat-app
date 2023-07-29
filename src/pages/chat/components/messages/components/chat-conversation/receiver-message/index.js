import React from "react";
import { Dropdown } from "../common";
import { formateMessageTime } from "../../../../../../../utils";
import { DeleteIcon } from "../../../../../../../resources/icons";
import { db } from "../../../../../../../firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import swal from "sweetalert";
import { useGetChatID } from "../../../../../../../hooks";

const ReceiverMessage = (props) => {
  const { message, created_at, id: messageID, isEdit } = props;
  const { chatID, user } = useGetChatID();

  const deleteMessage = async (deleteType) => {
    try {
      const loggedInUserMsgRef = doc(
        db,
        `users-chats/${user?.firebase_uid}/chats/${chatID}/messages`,
        messageID
      );
      if (deleteType === "delete_me") {
        await deleteDoc(loggedInUserMsgRef);
      }
    } catch (error) {
      console.error({ error });
    }
  };
  const handleDeleteMessage = () => {
    swal({
      text: "Delete message?",
      icon: "warning",
      buttons: {
        delete_me: {
          text: "Delete for me",
        },
        cancel: true,
      },
      dangerMode: true,
    }).then((value) => {
      switch (value) {
        case "delete_me":
          return deleteMessage("delete_me");
        default:
          return null;
      }
    });
  };
  const messageAction = [
    {
      id: "delete",
      label: "Delete",
      icon: DeleteIcon,
      cta: () => handleDeleteMessage(),
    },
  ];

  return (
    <li>
      <div className="conversation-list">
        <div className="chat-avatar">
          <img src="assets/images/users/avatar-4.jpg" alt="" />
        </div>

        <div className="user-chat-content">
          <div className="ctext-wrap">
            <div className="ctext-wrap-content">
              <p className="mb-0">{message}</p>
              {isEdit && <p className="mb-0">(edited)</p>}
              <p className="chat-time mb-0">
                <i className="ri-time-line align-middle"></i>{" "}
                <span className="align-middle">
                  {formateMessageTime(created_at?.seconds)}
                </span>
              </p>
            </div>
            <Dropdown
              {...{
                actions: messageAction,
              }}
            />
          </div>
          <div className="conversation-name">Doris Brown</div>
        </div>
      </div>
    </li>
  );
};

export default ReceiverMessage;
