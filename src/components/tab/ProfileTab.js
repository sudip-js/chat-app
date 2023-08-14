import React from "react";
import { useSelector } from "react-redux";
import {
  ClockIcon,
  EditIcon,
  EmailIcon,
  OnlineStatus,
  PhoneIcon,
  PlusIcon,
} from "../../resources/icons";
import Modal from "../misc/Modal";
import { useState } from "react";
import { EditContactInformation, EditProfile, SetStatus } from "./modal";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import { TextInput } from "../form";
import { PROFILE_CONSTANTS } from "../../constants";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useGetChatID } from "../../hooks";
import Avatar from "../../resources/images/avatar-profile.png";
import { notify } from "../../helpers";

const initialState = {
  isOpenEditModal: null,
  isLoading: null,
};

const ProfileTab = () => {
  const { chatID, receiverID } = useGetChatID();
  const user = useSelector(({ auth }) => auth?.user);
  const [state, setState] = useState(initialState);
  const { isOpenEditModal, isLoading } = state;
  const isEditProfile = isOpenEditModal === PROFILE_CONSTANTS.YOUR_PROFILE;
  const isEditContact =
    isOpenEditModal === PROFILE_CONSTANTS.CONTACT_INFORMATION;
  const isSetStatus = isOpenEditModal === PROFILE_CONSTANTS.SET_STATUS;

  const handleState = (newState) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const handleEditClick = (editType) => {
    handleState({
      isOpenEditModal: editType,
    });
  };

  const handleEdit = async (data) => {
    const userID = user?.firebase_uid;
    handleState({
      isLoading: isOpenEditModal,
    });
    try {
      const userRef = doc(db, `users/${userID}`);
      const userChatRef = doc(db, `users-chats/${userID}`);
      const userChatMessageRef = doc(
        db,
        `users-chats/${receiverID}/chats/${chatID}`
      );

      const getUserRefDoc = await getDoc(userRef);
      const getUserChatRefDoc = await getDoc(userChatRef);
      const getUserChatMessageRefDoc = await getDoc(userChatMessageRef);

      if (isEditProfile) {
        const file = data?.photo_url;
        let url = null;
        if (file) {
          const storageRef = ref(storage, `profile/${userID}/${file?.name}`);
          const response = await uploadBytes(storageRef, file, {
            contentType: file?.type ?? "",
          });
          url = await getDownloadURL(
            ref(storage, response?.metadata?.fullPath)
          );
        }
        if (getUserRefDoc?.exists()) {
          await updateDoc(userRef, {
            pronunciation_name: data?.pronunciation_name ?? null,
          });

          if (file) {
            await updateDoc(userRef, {
              photo_url: url ?? null,
            });
          }
        }
        if (getUserChatRefDoc?.exists()) {
          await updateDoc(userChatRef, {
            pronunciation_name: data?.pronunciation_name ?? null,
          });

          if (file) {
            await updateDoc(userChatRef, {
              photo_url: url ?? null,
            });
          }
        }

        if (getUserChatMessageRefDoc?.exists()) {
          if (file) {
            await updateDoc(userChatMessageRef, {
              photo_url: url ?? null,
            });
          }
        }
      }
      if (isEditContact) {
        if (getUserRefDoc?.exists()) {
          await updateDoc(userRef, {
            phone_number: data?.phone ?? null,
          });
        }
        if (getUserChatRefDoc?.exists()) {
          await updateDoc(userChatRef, {
            phone_number: data?.phone ?? null,
          });
        }
      }
      if (isSetStatus) {
        if (getUserRefDoc?.exists()) {
          await updateDoc(userRef, {
            away_status: data?.away_status ?? null,
          });
        }
        if (getUserChatRefDoc?.exists()) {
          await updateDoc(userChatRef, {
            away_status: data?.away_status ?? null,
          });
        }
      }
    } catch (error) {
      console.error({ error: error?.message });
      const errorMessage = error?.message?.split(":")?.at(0);
      notify({
        message: errorMessage,
        type: "error",
      });
    } finally {
      handleState({
        isLoading: null,
        isOpenEditModal: null,
      });
    }
  };

  const handleCloseModal = () => {
    if (!isLoading) {
      handleState({
        isOpenEditModal: null,
      });
    }
  };

  return (
    <>
      <div
        className="tab-pane"
        id="pills-user"
        role="tabpanel"
        aria-labelledby="pills-user-tab"
      >
        <div>
          <div
            style={{
              height: "50px",
            }}
            className="px-4 pt-4"
          >
            <h4 className="mb-0">Profile</h4>
          </div>
          <div className="profile">
            <div className="py-2">
              <div className="image-container mb-2">
                <img
                  className="profile-image"
                  src={user?.photo_url ?? Avatar}
                  alt="Avatar"
                />
              </div>
              <div className="d-flex flex-column mb-2 gap-2">
                <div className="d-flex align-items-start justify-content-between">
                  <div>
                    <h6 className="extra-large-font mb-1">{user?.username}</h6>
                    {user?.pronunciation_name && (
                      <h6 className="medium-font">
                        ({user.pronunciation_name})
                      </h6>
                    )}
                  </div>
                  <EditIcon
                    onClick={() =>
                      handleEditClick(PROFILE_CONSTANTS.YOUR_PROFILE)
                    }
                    className="large-font cursor--pointer"
                  />
                </div>
                {!user?.pronunciation_name && (
                  <p className="link mb-0">
                    <span
                      onClick={() =>
                        handleEditClick(PROFILE_CONSTANTS.YOUR_PROFILE)
                      }
                      className="cursor--pointer"
                    >
                      <PlusIcon /> Add name pronunciation
                    </span>
                  </p>
                )}
                <p className="mb-0">
                  <OnlineStatus /> Away, notifications snoozed
                </p>

                {user?.away_status && (
                  <p className="mb-0">{user.away_status}</p>
                )}
                <button
                  className="btn btn-primary w-50"
                  onClick={() => handleEditClick(PROFILE_CONSTANTS.SET_STATUS)}
                  type="button"
                >
                  {`${user?.away_status ? "Edit" : "Set"} a status`}
                </button>
              </div>
            </div>

            <div className="mb-2 d-flex flex-column gap-2 py-2">
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="mb-0">Contact information</h6>
                <EditIcon
                  onClick={() =>
                    handleEditClick(PROFILE_CONSTANTS.CONTACT_INFORMATION)
                  }
                  className="large-font cursor--pointer"
                />
              </div>
              <TextInput
                {...{
                  icon: EmailIcon,
                  value: user?.email,
                  disabled: true,
                }}
              />
              {user?.phone_number ? (
                <TextInput
                  {...{
                    icon: PhoneIcon,
                    value: user?.phone_number,
                    disabled: true,
                  }}
                />
              ) : (
                <p className="link mb-0">
                  <span
                    onClick={() =>
                      handleEditClick(PROFILE_CONSTANTS.CONTACT_INFORMATION)
                    }
                    className="cursor--pointer"
                  >
                    <PlusIcon /> Add Phone
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        {...{
          show: isOpenEditModal,
          title: isOpenEditModal?.includes("status")
            ? user?.away_status
              ? `Edit ${isOpenEditModal}`
              : `Set ${isOpenEditModal}`
            : `Edit ${isOpenEditModal ?? ""}`,
          submitText: "Update",
          hide: handleCloseModal,
          extraParams: {
            showFooter: false,
          },
        }}
      >
        {isEditProfile && (
          <EditProfile
            {...{
              onSubmit: handleEdit,
              user,
              isLoading,
              hide: handleCloseModal,
            }}
          />
        )}
        {isEditContact && (
          <EditContactInformation
            {...{
              onSubmit: handleEdit,
              user,
              isLoading,
              hide: handleCloseModal,
            }}
          />
        )}
        {isSetStatus && (
          <SetStatus
            {...{
              onSubmit: handleEdit,
              user,
              isLoading,
              hide: handleCloseModal,
            }}
          />
        )}
      </Modal>
    </>
  );
};

export default ProfileTab;
