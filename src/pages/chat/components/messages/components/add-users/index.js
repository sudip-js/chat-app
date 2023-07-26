import React, { useState } from "react";
import { GrowSpinner } from "../../../../../../components";
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../../../../firebase/firebase";
import { serverTimestamp } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "../../../../../../hooks";
import { generateChatId } from "../../../../../../utils";

const AddUser = () => {
  const navigate = useNavigate();
  const user = useSelector(({ auth }) => auth?.user);
  const { isLoading, data } = useFetchData({
    collectionRef: "users",
  });
  const [addUserState, setAddUserState] = useState({
    isLoading: null,
  });
  const { isLoading: isLoadingAddUser } = addUserState;
  const handleState = (newState) => {
    setAddUserState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const handleSetUpUser = (participant) => {
    return new Promise(async (resolve, reject) => {
      handleState({
        isLoading: participant?.firebase_uid,
      });
      const senderID = user?.firebase_uid;
      const receiverID = participant?.firebase_uid;
      const senderUserRef = doc(db, "users-chats", senderID);
      const receiverUserRef = doc(db, "users-chats", receiverID);
      try {
        const senderUserSnap = await getDoc(senderUserRef);
        const receiverUserSnap = await getDoc(receiverUserRef);
        if (!senderUserSnap?.exists() || !receiverUserSnap?.exists()) {
          await setDoc(senderUserRef, {
            firebase_uid: user?.firebase_uid,
            username: user?.username,
            email: user?.email,
            phone_number: user?.phone_number,
            photo_url: user?.photo_url,
          });
          await setDoc(receiverUserRef, {
            firebase_uid: participant?.firebase_uid,
            username: participant?.username,
            email: participant?.email,
            phone_number: participant?.phone_number,
            photo_url: participant?.photo_url,
          });
          handleState({
            isLoading: null,
          });
          resolve();
        } else {
          handleState({
            isLoading: null,
          });
          resolve();
        }
      } catch (error) {
        handleState({
          isLoading: null,
        });
        reject(new Error(error?.message));
        console.error({ error: error });
      }
    });
  };
  const handleSetUpChat = (participant) => {
    handleState({
      isLoading: participant?.firebase_uid,
    });
    const senderID = user?.firebase_uid;
    const receiverID = participant?.firebase_uid;
    const chatID = generateChatId(senderID, receiverID);
    return new Promise(async (resolve, reject) => {
      const senderUserChatsRef = doc(
        db,
        `users-chats/${senderID}/chats`,
        chatID
      );
      const receiverUserChatsRef = doc(
        db,
        `users-chats/${receiverID}/chats`,
        chatID
      );
      try {
        const senderUserChatsSnap = await getDoc(senderUserChatsRef);
        const receiverUserChatsSnap = await getDoc(receiverUserChatsRef);
        if (senderUserChatsSnap.exists() || receiverUserChatsSnap.exists()) {
          console.log("here navigate to chat section");
          handleState({
            isLoading: null,
          });
          navigate(`/chat?chat_id=${chatID}`);
          resolve();
        } else {
          await setDoc(senderUserChatsRef, {
            created_at: serverTimestamp(),
            chat_type: "1-1",
            chat_id: chatID,
            username: participant?.username,
            email: participant?.email,
            phone_number: participant?.phone_number,
            photo_url: participant?.photo_url,
            is_typing: false,
            last_info: {
              time: null,
              last_message: null,
              type: null,
            },
            should_notify: false,
            send_by: "",
            who_is_typing_name: "",
            who_is_typing_id: "",
          });
          await setDoc(receiverUserChatsRef, {
            created_at: serverTimestamp(),
            chat_type: "1-1",
            chat_id: chatID,
            username: user?.username,
            email: user?.email,
            phone_number: user?.phone_number,
            photo_url: user?.photo_url,
            is_typing: false,
            last_info: {
              time: null,
              last_message: null,
              type: null,
            },
            should_notify: false,
            send_by: "",
            who_is_typing_name: "",
            who_is_typing_id: "",
          });
          handleState({
            isLoading: null,
          });
          resolve();
        }
      } catch (error) {
        handleState({
          isLoading: null,
        });
        reject(new Error(error?.message));
        console.error({ error: error });
      }
    });
  };

  const handleUser = async (participant) => {
    try {
      await handleSetUpUser(participant);
      await handleSetUpChat(participant);
    } catch (error) {
      console.log({ error: error });
    }
  };
  return (
    <div className="chat-message-list px-2" data-simplebar>
      <ul className="list-unstyled chat-list chat-user-list">
        {isLoading ? (
          <GrowSpinner />
        ) : data?.length ? (
          data.map((user) => {
            const { firebase_uid, username } = user;
            return (
              <li key={firebase_uid}>
                <a>
                  <div className="d-flex">
                    <div
                      className={`chat-user-img online align-self-center me-3 ms-0`}
                    >
                      <img
                        src="assets/images/users/avatar-8.jpg"
                        className="rounded-circle avatar-xs"
                        alt=""
                      />
                      <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={<Tooltip id="button-tooltip">Online</Tooltip>}
                      >
                        <span className="user-status"></span>
                      </OverlayTrigger>
                    </div>

                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="text-truncate font-size-15 mb-1">
                        {username}
                      </h5>
                      <p className="chat-user-message text-truncate mb-0">
                        last message...
                      </p>
                    </div>

                    <div>
                      <button
                        onClick={() => handleUser(user)}
                        type="button"
                        className={`btn btn-success w-6`}
                      >
                        {isLoadingAddUser === firebase_uid ? (
                          <Spinner size="sm" />
                        ) : (
                          "Add"
                        )}
                      </button>
                    </div>
                  </div>
                </a>
              </li>
            );
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
  );
};

export default AddUser;
