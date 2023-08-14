import React, { useEffect, useState, useRef } from "react";
import { EmojiIcon } from "../../../resources/icons";
import { Spinner } from "react-bootstrap";
import { PROFILE_CONSTANTS } from "../../../constants";
import Picker from "emoji-picker-react";
import { insertAtCursor } from "../../../utils";
import swal from "sweetalert";

const initialState = {
  isShowEmojiPicker: false,
  away_status: "",
};
const awayStatus = [
  {
    label: "In a meeting",
    icon: "🗓️",
  },
  {
    label: "Commuting",
    icon: "🚎",
  },
  {
    label: "Out Sick",
    icon: "🤒",
  },
  {
    label: "Vacationing",
    icon: "🌴",
  },
  {
    label: "Working remotely",
    icon: "🏡",
  },
];

const SetStatus = ({
  onSubmit = () => null,
  user = null,
  isLoading = null,
  hide = () => null,
}) => {
  const inputRef = useRef(null);
  const isLoadingShow = isLoading === PROFILE_CONSTANTS.SET_STATUS;
  const [state, setState] = useState(initialState);
  const { isShowEmojiPicker, away_status } = state;
  const handleState = (newState) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const onEmojiClick = ({ emoji }) => {
    if (!emoji) return;
    const ref = inputRef?.current;
    if (!ref) return;
    insertAtCursor({ ref, data: emoji });
    handleState({
      away_status: inputRef?.current?.value,
      isShowEmojiPicker: false,
    });
    ref.focus();
  };
  const handleOnChange = (e) => {
    const value = e.target.value;
    handleState({
      away_status: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!away_status) {
      swal({
        type: "danger",
        text: "Please select a status",
        icon: "error",
        timer: 3000,
      });
      return;
    }
    onSubmit({
      away_status,
    });
  };
  const handleClickStatus = ({ icon, label }) => {
    if (!icon && !label) return;
    const away_status = `${icon} ${label}`;
    handleState({
      away_status,
    });
  };

  useEffect(() => {
    if (user?.away_status) {
      handleState({
        away_status: user?.away_status,
      });
    }
  }, [user?.away_status]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 d-flex align-items-center gap-2">
          <EmojiIcon
            onClick={() =>
              handleState({
                isShowEmojiPicker: true,
              })
            }
            className="large-font cursor--pointer"
          />
          <input
            ref={inputRef}
            name="away_status"
            className="form-control form-control-lg bg-light border-light"
            placeholder="What's your status?"
            onChange={handleOnChange}
            value={away_status}
          />
        </div>
        {isShowEmojiPicker ? (
          <Picker width="100%" onEmojiClick={onEmojiClick} />
        ) : (
          <div className="mb-3">
            <h6>For CHATBOT</h6>
            <ul className="status-ul">
              {Array.isArray(awayStatus) &&
                awayStatus?.length &&
                awayStatus.map(({ label, icon }) => {
                  return (
                    <li
                      key={label}
                      onClick={() =>
                        handleClickStatus({
                          label,
                          icon,
                        })
                      }
                    >
                      <span className="extra-large-font">{icon}</span>
                      <span>{label}</span>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}

        <div className="modal-footer">
          <button type="button" className="btn btn-danger w-25" onClick={hide}>
            Close
          </button>
          <button
            disabled={isLoadingShow}
            type="submit"
            className="btn btn-primary w-25"
          >
            {isLoadingShow ? (
              <span>
                <Spinner size="sm" />
              </span>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default SetStatus;
