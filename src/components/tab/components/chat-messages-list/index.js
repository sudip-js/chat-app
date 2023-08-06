import React from "react";
import ListItem from "./ListItem";
import { useFetchData } from "../../../../hooks";
import { GrowSpinner } from "../../../spinner";
import { PlusIcon } from "../../../../resources/icons";

const ChatMessagesList = ({ handleOpenModal = () => null }) => {
  const { isLoading, data } = useFetchData({
    collectionRef: "users-chats",
  });
  return (
    <div>
      <div className="d-flex align-items-center mb-3 px-3 justify-content-between">
        <h5 className="mb-0 font-size-16 text-uppercase">Direct Messages</h5>
        <PlusIcon
          onClick={handleOpenModal}
          className="large-font cursor--pointer text-green"
        />
      </div>
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
