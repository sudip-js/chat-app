import React from "react";
import {
  ChatsTab,
  ContactsTab,
  GroupsTab,
  ProfileTab,
  SettingsTab,
  SidebarMenu,
  UserProfileSidebar,
} from "../../components";
import { useLocation } from "react-router-dom";
import { Messages, StartConversation } from "./components";
import Modal from "../../components/misc/Modal";

const Chat = () => {
  const location = useLocation();

  return (
    <div className="layout-wrapper d-lg-flex">
      <SidebarMenu />
      <div className="chat-leftsidebar me-lg-1 ms-lg-0">
        <div className="tab-content">
          <ProfileTab />
          <ChatsTab />
          <GroupsTab />
          <ContactsTab />
          <SettingsTab />
        </div>
      </div>

      <div className="user-chat w-100 overflow-hidden">
        <div className="d-lg-flex">
          {location?.search ? <Messages /> : <StartConversation />}
          <UserProfileSidebar />
        </div>
      </div>
    </div>
  );
};

export default Chat;
