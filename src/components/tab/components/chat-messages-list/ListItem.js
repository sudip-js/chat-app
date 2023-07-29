import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetChatID } from "../../../../hooks";

const ListItem = ({ username, firebase_uid, ...rest }) => {
  const navigate = useNavigate();
  const { chatID } = useGetChatID();
  const isActive = chatID?.includes(firebase_uid);

  return (
    <li
      className={isActive ? "active" : ""}
      onClick={() => navigate(`/chat?chat_id=${chatID}`)}
    >
      <a>
        <div className="d-flex">
          <div className="chat-user-img online align-self-center me-3 ms-0">
            <img
              src="assets/images/users/avatar-2.jpg"
              className="rounded-circle avatar-xs"
              alt=""
            />
            <span className="user-status"></span>
          </div>

          <div className="flex-grow-1 overflow-hidden">
            <h5 className="text-truncate font-size-15 mb-1">{username}</h5>
            <p className="chat-user-message text-truncate mb-0">
              Last messages....
            </p>
          </div>
          <div className="font-size-11">05 min</div>
        </div>
      </a>
    </li>
  );
};

export default ListItem;
