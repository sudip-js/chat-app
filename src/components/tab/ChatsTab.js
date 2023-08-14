import React, { useState } from "react";
import Modal from "../misc/Modal";
import { AddUser } from "../../pages/chat/components";
import { ChatMessagesList } from "./components";

const initialState = {
  isOpenSelectUserModal: false,
};
const ChatsTab = () => {
  const [state, setState] = useState(initialState);
  const { isOpenSelectUserModal } = state;
  const handleState = (newState) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const handleOpenModal = () => {
    handleState({
      isOpenSelectUserModal: !isOpenSelectUserModal,
    });
  };
  return (
    <>
      <div
        className="tab-pane fade show active"
        id="pills-chat"
        role="tabpanel"
        aria-labelledby="pills-chat-tab"
      >
        {/* <!-- Start chats content --> */}
        <div>
          <div className="px-4 pt-4">
            <div className="mb-4 d-flex align-items-center justify-content-between">
              <h4>Chats</h4>
            </div>
            {/* <div className="search-box chat-search-box">
              <div className="input-group mb-3 rounded-3">
                <span
                  className="input-group-text text-muted bg-light pe-1 ps-3"
                  id="basic-addon1"
                >
                  <i className="ri-search-line search-icon font-size-18"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-light"
                  placeholder="Search messages or users"
                  aria-label="Search messages or users"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div> */}
            {/* <!-- Search Box--> */}
          </div>
          {/* <!-- .p-4 --> */}

          {/* <!-- Start user status --> */}
          {/* <div className="px-4 pb-4" dir="ltr">
            <div className="owl-carousel owl-theme" id="user-status-carousel">
              <div className="item">
                <a href="#" className="user-status-box">
                  <div className="avatar-xs mx-auto d-block chat-user-img online">
                    <img
                      src="assets/images/users/avatar-2.jpg"
                      alt="user-img"
                      className="img-fluid rounded-circle"
                    />
                    <span className="user-status"></span>
                  </div>

                  <h5 className="font-size-13 text-truncate mt-3 mb-1">
                    Patrick
                  </h5>
                </a>
              </div>
              <div className="item">
                <a href="#" className="user-status-box">
                  <div className="avatar-xs mx-auto d-block chat-user-img online">
                    <img
                      src="assets/images/users/avatar-4.jpg"
                      alt="user-img"
                      className="img-fluid rounded-circle"
                    />
                    <span className="user-status"></span>
                  </div>

                  <h5 className="font-size-13 text-truncate mt-3 mb-1">
                    Doris
                  </h5>
                </a>
              </div>

              <div className="item">
                <a href="#" className="user-status-box">
                  <div className="avatar-xs mx-auto d-block chat-user-img online">
                    <img
                      src="assets/images/users/avatar-5.jpg"
                      alt="user-img"
                      className="img-fluid rounded-circle"
                    />
                    <span className="user-status"></span>
                  </div>

                  <h5 className="font-size-13 text-truncate mt-3 mb-1">
                    Emily
                  </h5>
                </a>
              </div>

              <div className="item">
                <a href="#" className="user-status-box">
                  <div className="avatar-xs mx-auto d-block chat-user-img online">
                    <img
                      src="assets/images/users/avatar-6.jpg"
                      alt="user-img"
                      className="img-fluid rounded-circle"
                    />
                    <span className="user-status"></span>
                  </div>

                  <h5 className="font-size-13 text-truncate mt-3 mb-1">
                    Steve
                  </h5>
                </a>
              </div>

              <div className="item">
                <a href="#" className="user-status-box">
                  <div className="avatar-xs mx-auto d-block chat-user-img online">
                    <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                      T
                    </span>
                    <span className="user-status"></span>
                  </div>

                  <h5 className="font-size-13 text-truncate mt-3 mb-1">
                    Teresa
                  </h5>
                </a>
              </div>
            </div>
          </div> */}
          {/* <!-- end user status --> */}

          <ChatMessagesList
            {...{
              handleOpenModal,
            }}
          />
        </div>
        {/* <!-- Start chats content --> */}
      </div>
      <Modal
        {...{
          show: isOpenSelectUserModal,
          title: "Add User",
          submitText: "Submit",
          hide: () => {
            handleState({
              isOpenSelectUserModal: false,
            });
          },
        }}
      >
        <AddUser />
      </Modal>
    </>
  );
};

export default ChatsTab;
