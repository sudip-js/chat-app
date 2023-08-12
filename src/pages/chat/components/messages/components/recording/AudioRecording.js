import React from "react";
import {
  CheckIcon,
  ClearIcon,
  SendIcon,
} from "../../../../../../resources/icons";
import {
  formatMinutes,
  formatSeconds,
} from "../../../../../../utils/date-time";
import { useAudioRecorder } from "../../../../../../hooks";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import {
  useGetChatID,
  useUploadDataToFirebase,
} from "../../../../../../hooks/chats";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../../../firebase/firebase";

const AudioRecording = ({
  chatInputState,
  setChatInputState,
  audioRecordingInitialState,
}) => {
  const { initRecording, recordingMinutes, recordingSeconds, audio } =
    chatInputState;
  const {
    handleStartRecording,
    handleSaveRecording,
    handleCancelRecording,
    handleRemoveRecording,
  } = useAudioRecorder({
    state: chatInputState,
    setState: setChatInputState,
    initialState: audioRecordingInitialState,
  });
  const { onSubmit } = useUploadDataToFirebase();
  const [isLoading, setIsLoading] = useState(false);

  const handleSendAudio = async () => {
    try {
      if (Array.isArray(audio) && audio.length) {
        setIsLoading(true);
        onAuthStateChanged(auth, async (userResponse) => {
          if (userResponse) {
            for (let file of audio) {
              await onSubmit({
                file,
              });
            }
          }
          setChatInputState((prev) => ({
            ...prev,
            isShowAudioRecordModal: false,
            audio: [],
          }));
          setIsLoading(false);
        });
      }
    } catch (error) {
      setChatInputState((prev) => ({
        ...prev,
        isShowAudioRecordModal: false,
        audio: [],
      }));
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex flex-column justify-content-center gap-2">
        {initRecording ? (
          <>
            <div className="d-flex justify-content-center align-items-center gap-2">
              <p className="mb-0 extra-large-font">Recording...</p>
              <div className="">
                <span>{formatMinutes(recordingMinutes)}</span>
                <span>:</span>
                <span>{formatSeconds(recordingSeconds)}</span>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center gap-2">
              <button
                onClick={handleSaveRecording}
                type="button"
                className="btn btn-primary"
              >
                <CheckIcon className="extra-large-font" />
              </button>
              <button
                onClick={handleCancelRecording}
                type="button"
                className="btn btn-danger"
              >
                <ClearIcon className="extra-large-font" />
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={handleStartRecording}
              type="button"
              className="btn btn-primary"
            >
              Start Recording
            </button>
            {Array.isArray(audio) && audio.length
              ? audio.map((blob, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex justify-content-center align-items-center gap-2"
                    >
                      <audio
                        controls
                        src={window?.URL?.createObjectURL(blob)}
                      ></audio>
                      <button
                        onClick={() => handleRemoveRecording({ index })}
                        type="button"
                        className="btn btn-danger"
                      >
                        <ClearIcon className="extra-large-font" />
                      </button>
                      <button
                        onClick={handleSendAudio}
                        type="button"
                        className="btn btn-success"
                      >
                        {isLoading ? (
                          <Spinner size="sm" />
                        ) : (
                          <SendIcon className="extra-large-font" />
                        )}
                      </button>
                    </div>
                  );
                })
              : null}
          </>
        )}
      </div>
    </div>
  );
};

export default AudioRecording;
