import React from "react";
import { Dropdown } from "../common";
import { formateMessageTime } from "../../../../../../../utils";
import { DeleteIcon, EditIcon } from "../../../../../../../resources/icons";
import swal from "sweetalert";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../../../../firebase/firebase";
import { useGetChatID } from "../../../../../../../hooks";
import RenderMessage from "../common/RenderMessage";
import Avatar from "../../../../../../../resources/images/avatar-profile.png";

const SenderMessage = (props) => {
  const {
    message,
    created_at,
    setChatInputState,
    id: messageID,
    is_edit,
  } = props;
  const { senderID, receiverID, chatID, user } = useGetChatID();
  const deleteMessage = async (deleteType) => {
    try {
      const senderUserMessageRef = doc(
        db,
        `users-chats/${senderID}/chats/${chatID}/messages`,
        messageID
      );
      const receiverUserMessageRef = doc(
        db,
        `users-chats/${receiverID}/chats/${chatID}/messages`,
        messageID
      );
      if (deleteType === "delete_everyone") {
        await deleteDoc(senderUserMessageRef);
        await deleteDoc(receiverUserMessageRef);
      }
      if (deleteType === "delete_me") {
        await deleteDoc(senderUserMessageRef);
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
        delete_everyone: {
          text: "Delete for everyone",
        },
        delete_me: {
          text: "Delete for me",
        },
        cancel: true,
      },
      dangerMode: true,
    }).then((value) => {
      switch (value) {
        case "delete_everyone":
          return deleteMessage("delete_everyone");
        case "delete_me":
          return deleteMessage("delete_me");
        default:
          return null;
      }
    });
  };
  const messageAction = [
    {
      id: "edit",
      label: "Edit",
      icon: EditIcon,
      cta: () => {
        setChatInputState((prevState) => ({
          ...prevState,
          message,
          isEditMessage: true,
          isEditMessageID: messageID,
        }));
      },
    },
    {
      id: "delete",
      label: "Delete",
      icon: DeleteIcon,
      cta: () => handleDeleteMessage(),
    },
  ];

  return (
    <li className="right">
      <div className="conversation-list">
        <div className="chat-avatar">
          <img
            className="image"
            src={user?.photo_url ?? Avatar}
            alt="Profile Image"
          />
        </div>

        <div className="user-chat-content">
          <div className="ctext-wrap">
            <div className="ctext-wrap-content">
              <RenderMessage
                {...{
                  data: { ...props },
                }}
              />
              {is_edit && <p className="mb-0">(edited)</p>}
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
          <div className="conversation-name">{user?.username}</div>
        </div>
      </div>
    </li>
  );
};

export default SenderMessage;
