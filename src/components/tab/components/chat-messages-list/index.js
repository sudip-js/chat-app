import React from "react";
import ListItem from "./ListItem";
import { useFetchData } from "../../../../hooks";
import { GrowSpinner } from "../../../spinner";

const ChatMessagesList = () => {
  const { isLoading, data } = useFetchData({
    collectionRef: "users-chats",
  });
  return (
    <div>
      <h5 className="mb-3 px-3 font-size-16">Recent</h5>
      <div className="chat-message-list px-2" data-simplebar>
        <ul className="list-unstyled chat-list chat-user-list">
          {isLoading ? (
            <GrowSpinner />
          ) : data?.length ? (
            data.map((user) => {
              return <ListItem key={user?.firebase_uid} {...user} />;
            })
          ) : (
            <li>
              <a>
                <h5 className="text-truncate font-size-15 mb-1">
                  No users are found please try again later.
                </h5>
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ChatMessagesList;
