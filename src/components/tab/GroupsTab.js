import React, { useState } from "react";
import Modal from "../misc/Modal";
import { CreateGroupModal } from "./modal";

const initialState = {
  showCreateGroupModal: false,
};
const GroupsTab = () => {
  const [state, setState] = useState(initialState);
  const { showCreateGroupModal } = state;
  const handleState = (newState) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };
  return (
    <>
      {" "}
      <div
        className="tab-pane"
        id="pills-groups"
        role="tabpanel"
        aria-labelledby="pills-groups-tab"
      >
        {/* <!-- Start Groups content --> */}
        <div>
          <div className="p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h4 className="mb-0">Groups</h4>
              <button
                type="button"
                className="btn btn-success"
                onClick={() =>
                  handleState({
                    showCreateGroupModal: true,
                  })
                }
              >
                Create Group
              </button>
            </div>

            <div className="search-box chat-search-box">
              <div className="input-group rounded-3">
                <span
                  className="input-group-text text-muted bg-light pe-1 ps-3"
                  id="basic-addon1"
                >
                  <i className="ri-search-line search-icon font-size-18"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-light"
                  placeholder="Search groups..."
                  aria-label="Search groups..."
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            {/* <!-- Search Box--> */}
          </div>

          {/* <!-- Start chat-group-list --> */}
          <div className="p-4 chat-message-list chat-group-list" data-simplebar>
            <ul className="list-unstyled chat-list">
              <li>
                <a href="#">
                  <div className="d-flex align-items-center">
                    <div className="chat-user-img me-3 ms-0">
                      <div className="avatar-xs">
                        <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                          G
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="text-truncate font-size-14 mb-0">
                        #General
                      </h5>
                    </div>
                  </div>
                </a>
              </li>

              <li>
                <a href="#">
                  <div className="d-flex align-items-center">
                    <div className="chat-user-img me-3 ms-0">
                      <div className="avatar-xs">
                        <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                          R
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="text-truncate font-size-14 mb-0">
                        #Reporting{" "}
                        <span className="badge badge-soft-danger rounded-pill float-end">
                          +23
                        </span>
                      </h5>
                    </div>
                  </div>
                </a>
              </li>

              <li>
                <a href="#">
                  <div className="d-flex align-items-center">
                    <div className="chat-user-img me-3 ms-0">
                      <div className="avatar-xs">
                        <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                          D
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="text-truncate font-size-14 mb-0">
                        #Designers
                      </h5>
                    </div>
                  </div>
                </a>
              </li>

              <li>
                <a href="#">
                  <div className="d-flex align-items-center">
                    <div className="chat-user-img me-3 ms-0">
                      <div className="avatar-xs">
                        <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                          D
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="text-truncate font-size-14 mb-0">
                        #Developers{" "}
                        <span className="badge badge-soft-danger rounded-pill float-end">
                          New
                        </span>
                      </h5>
                    </div>
                  </div>
                </a>
              </li>

              <li>
                <a href="#">
                  <div className="d-flex align-items-center">
                    <div className="chat-user-img me-3 ms-0">
                      <div className="avatar-xs">
                        <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                          P
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="text-truncate font-size-14 mb-0">
                        #Project-alpha
                      </h5>
                    </div>
                  </div>
                </a>
              </li>

              <li>
                <a href="#">
                  <div className="d-flex align-items-center">
                    <div className="chat-user-img me-3 ms-0">
                      <div className="avatar-xs">
                        <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                          B
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="text-truncate font-size-14 mb-0">
                        #Snacks
                      </h5>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          {/* <!-- End chat-group-list --> */}
        </div>
        {/* <!-- End Groups content --> */}
      </div>
      <Modal
        {...{
          show: showCreateGroupModal,
          title: "Create Group",
          submitText: "Submit",
          hide: () => {
            handleState({
              showCreateGroupModal: false,
            });
          },
        }}
      >
        <CreateGroupModal />
      </Modal>
    </>
  );
};

export default GroupsTab;
