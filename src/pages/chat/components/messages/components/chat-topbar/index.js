import React from "react";
import { UserIcon } from "../../../../../../resources/icons";

const ChatTopBar = ({ selectedUser = null }) => {
  return (
    <div className="p-3 p-lg-4 border-bottom user-chat-topbar">
      <div className="row align-items-center">
        <div className="col-sm-4 col-8">
          <div className="d-flex align-items-center">
            <div className="d-block d-lg-none me-2 ms-0">
              <a
                href="javascript: void(0);"
                className="user-chat-remove text-muted font-size-16 p-2"
              >
                <i className="ri-arrow-left-s-line"></i>
              </a>
            </div>
            <div className="me-3 ms-0">
              <img
                src={
                  selectedUser?.photo_url ?? "assets/images/users/avatar-4.jpg"
                }
                className="rounded-circle avatar-xs"
                alt=""
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="flex-grow-1 overflow-hidden">
              <h5 className="font-size-16 mb-0 text-truncate">
                <a href="#" className="text-reset user-profile-show">
                  {selectedUser?.username ?? ""}
                </a>{" "}
                <i className="ri-record-circle-fill font-size-10 text-success d-inline-block ms-1"></i>
              </h5>
            </div>
          </div>
        </div>
        <div className="col-sm-8 col-4">
          <ul className="list-inline user-chat-nav text-end mb-0">
            <li className="list-inline-item">
              <div className="dropdown">
                <button
                  className="btn nav-btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="ri-search-line"></i>
                </button>
                <div className="dropdown-menu p-0 dropdown-menu-end dropdown-menu-md">
                  <div className="search-box p-2">
                    <input
                      type="text"
                      className="form-control bg-light border-0"
                      placeholder="Search.."
                    />
                  </div>
                </div>
              </div>
            </li>

            <li className="list-inline-item d-none d-lg-inline-block me-2 ms-0">
              <button type="button" className="btn nav-btn user-profile-show">
                <UserIcon />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatTopBar;
