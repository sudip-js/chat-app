import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { generateChatId } from "../../../../utils";
import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { useState } from "react";
import Avatar from "../../../../resources/images/avatar-profile.png";
import { notify } from "../../../../helpers";

const ListItem = ({
  username,
  firebase_uid,
  photo_url,
  is_typing,
  who_is_typing_id,
}) => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(({ auth }) => auth?.user);
  const query = new URLSearchParams(location?.search);
  const isActive = query.get("chat_id")?.includes(firebase_uid);
  const chatID = generateChatId(user?.firebase_uid, firebase_uid);

  useEffect(() => {
    if (!firebase_uid) return;
    const docRef = doc(db, `users/${firebase_uid}`);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const res = docSnapshot.data();
          if (res) {
            setData(res);
          }
        } else {
          console.error("Document not found in Firestore.");
          notify({
            message: "Document not found in Firestore.",
            type: "error",
          });
        }
      },
      (error) => {
        console.error("Error getting real-time updates:", error);
        notify({
          message: error?.message ?? "Something Went Wrong!",
          type: "error",
        });
      }
    );

    return () => {
      unsubscribe();
    };
  }, [firebase_uid]);

  return (
    <li
      className={`cursor--pointer ${isActive ? "active" : ""}`}
      onClick={() => navigate(`/chat?chat_id=${chatID}`)}
    >
      <a>
        <div className="d-flex">
          <div
            className={`chat-user-img align-self-center me-3 ms-0 ${
              data?.online ? "online" : "offline"
            }`}
          >
            <img
              src={photo_url ?? Avatar}
              className="rounded-circle avatar-xs"
              alt="Avatar"
              style={{
                objectFit: "cover",
              }}
            />
            <span className="user-status"></span>
          </div>

          <div className="flex-grow-1 overflow-hidden">
            <h5 className="text-truncate font-size-15 mb-1">{username}</h5>

            {is_typing && who_is_typing_id !== user.firebase_uid ? (
              <p className="chat-user-message text-truncate mb-0">
                typing
                <span className="animate-typing">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </span>
              </p>
            ) : (
              <p className="chat-user-message text-truncate mb-0">
                Last messages....
              </p>
            )}
          </div>
          <div className="font-size-11">05 min</div>
        </div>
      </a>
    </li>
  );
};

export default ListItem;
