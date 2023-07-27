import React from "react";
import { Dropdown } from "../common";

const SenderMessage = () => {
  return (
    <li className="right">
      <div className="conversation-list">
        <div className="chat-avatar">
          <img src="assets/images/users/avatar-4.jpg" alt="" />
        </div>

        <div className="user-chat-content">
          <div className="ctext-wrap">
            <div className="ctext-wrap-content">
              <p className="mb-0">Good morning</p>
              <p className="chat-time mb-0">
                <i className="ri-time-line align-middle"></i>{" "}
                <span className="align-middle">10:00</span>
              </p>
            </div>
            <Dropdown />
          </div>
          <div className="conversation-name">Doris Brown</div>
        </div>
      </div>
    </li>
  );
};

export default SenderMessage;
