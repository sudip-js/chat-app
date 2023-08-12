import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import RecordRTC from "recordrtc";
import { RecordIcon, SendIcon } from "../../../../../../resources/icons";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../../../firebase/firebase";
import { useUploadDataToFirebase } from "../../../../../../hooks/chats";
import { Spinner } from "react-bootstrap";
import moment from "moment/moment";

const VideoRecording = ({ setChatInputState }) => {
  const { onSubmit } = useUploadDataToFirebase();
  const videoRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [videoSrc, setVideoSrc] = useState("");
  const [mediaStream, setMediaStream] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [blob, setBlob] = useState(null);
  const [seconds, setSeconds] = useState(0);

  const startRecording = () => {
    try {
      const recordRTC = RecordRTC(mediaStream, { type: "video" });
      setRecording(true);
      setSeconds(0);
      setBlob(null);
      setStream(mediaStream);
      setRecorder(recordRTC);
      recordRTC.startRecording();
    } catch (error) {
      console.error({ error });
    }
  };

  const stopRecording = () => {
    try {
      if (recorder) {
        recorder.stopRecording(() => {
          const blob = recorder.getBlob();
          setBlob(blob);
          const videoUrl = URL.createObjectURL(blob);
          setVideoSrc(videoUrl);
          stream.getTracks().forEach((track) => track.stop());
          setRecording(false);
        });
      }
    } catch (error) {
      console.error({ error });
    }
  };
  const handleStartCamera = async () => {
    if (!videoRef && !videoRef?.current) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMediaStream(stream);
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error({ err });
    }
  };
  const handleSendVideo = () => {
    try {
      if (videoSrc) {
        setIsLoading(true);
        onAuthStateChanged(auth, async (userResponse) => {
          if (userResponse) {
            await onSubmit({
              file: blob,
            });
          }
          setChatInputState((prev) => ({
            ...prev,
            isShowVideoRecordModal: false,
          }));
          setBlob(null);
          setVideoSrc("");
          setIsLoading(false);
        });
      }
    } catch (error) {
      console.error({ error });
      setBlob(null);
      setVideoSrc("");
      setIsLoading(false);
    }
  };
  const handleCancelVideo = () => {
    setVideoSrc("");
    handleStartCamera();
  };

  useEffect(() => {
    handleStartCamera();
  }, []);

  useEffect(() => {
    let timerInterval;
    if (recording) {
      timerInterval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [recording]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center gap-2">
      <div className="d-flex justify-content-center align-items-center gap-2">
        <p className="mb-0 extra-large-font">Recording...</p>
        <div className="">{moment.utc(seconds * 1000).format("HH:mm:ss")}</div>
      </div>
      {videoSrc && (
        <video src={videoSrc} controls height="400px" width="100%" />
      )}{" "}
      {!videoSrc && (
        <video
          ref={videoRef}
          playsInline
          height="400px"
          width="100%"
          autoPlay
        />
      )}
      {!videoSrc && recording && (
        <button className="btn btn-danger w-50" onClick={stopRecording}>
          Stop Recording
        </button>
      )}
      {!videoSrc && !recording && (
        <button className="btn btn-success w-50" onClick={startRecording}>
          Start Recording
        </button>
      )}
      {videoSrc && (
        <div className="d-flex justify-content-end align-items-center gap-2 w-100">
          <button
            className="btn btn-success w-25 d-flex justify-content-center align-items-center gap-2"
            onClick={handleSendVideo}
          >
            Send{" "}
            {isLoading ? (
              <Spinner size="sm" />
            ) : (
              <SendIcon className="extra-large-font" />
            )}
          </button>
          <button
            className="btn btn-danger w-25 d-flex justify-content-center align-items-center gap-2"
            onClick={handleCancelVideo}
          >
            Record Again <RecordIcon className="large-font" />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoRecording;
