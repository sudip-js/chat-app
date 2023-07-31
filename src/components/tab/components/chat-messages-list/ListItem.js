import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { generateChatId } from "../../../../utils";

const ListItem = ({ username, firebase_uid, photo_url, ...rest }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(({ auth }) => auth?.user);
  const query = new URLSearchParams(location?.search);
  const isActive = query.get("chat_id")?.includes(firebase_uid);
  const chatID = generateChatId(user?.firebase_uid, firebase_uid);

  console.log({ ...rest });

  return (
    <li
      className={isActive ? "active" : ""}
      onClick={() => navigate(`/chat?chat_id=${chatID}`)}
    >
      <a>
        <div className="d-flex">
          <div className="chat-user-img online align-self-center me-3 ms-0">
            <img
              src={photo_url ?? "assets/images/users/avatar-2.jpg"}
              className="rounded-circle avatar-xs"
              alt=""
              style={{
                objectFit: "cover",
              }}
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
