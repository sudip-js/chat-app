import { useEffect } from "react";

export const useAudioRecorder = ({ state, setState, initialState }) => {
  const { mediaStream, mediaRecorder, initRecording, audio } = state;

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setState((prevState) => ({
        ...prevState,
        initRecording: true,
        mediaStream: stream,
      }));
    } catch (err) {
      console.error({ err });
    }
  };

  const handleSaveRecording = () => {
    if (mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
  };
  const handleCancelRecording = () => {
    setState((prevState) => ({
      ...prevState,
      ...initialState,
    }));
  };
  const handleRemoveRecording = ({ index }) => {
    let tempAudio = [...audio];
    setState((prevState) => ({
      ...prevState,
      audio: tempAudio.filter((_, idx) => idx !== index),
    }));
  };

  useEffect(() => {
    const MAX_RECORDER_TIME = 5;
    let recordingInterval = null;

    if (initRecording)
      recordingInterval = setInterval(() => {
        setState((prevState) => {
          if (
            prevState.recordingMinutes === MAX_RECORDER_TIME &&
            prevState.recordingSeconds === 0
          ) {
            clearInterval(recordingInterval);
            return prevState;
          }

          if (
            prevState.recordingSeconds >= 0 &&
            prevState.recordingSeconds < 59
          )
            return {
              ...prevState,
              recordingSeconds: prevState.recordingSeconds + 1,
            };

          if (prevState.recordingSeconds === 59)
            return {
              ...prevState,
              recordingMinutes: prevState.recordingMinutes + 1,
              recordingSeconds: 0,
            };
        });
      }, 1000);
    else clearInterval(recordingInterval);

    return () => clearInterval(recordingInterval);
  });

  useEffect(() => {
    if (mediaStream)
      setState((prevState) => {
        return {
          ...prevState,
          mediaRecorder: new MediaRecorder(prevState.mediaStream),
        };
      });
  }, [mediaStream]);

  useEffect(() => {
    const recorder = mediaRecorder;
    let chunks = [];
    if (recorder && recorder.state === "inactive") {
      recorder.start();
      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        chunks = [];
        setState((prevState) => {
          if (prevState.mediaRecorder)
            return {
              ...prevState,
              ...initialState,
              audio: [...prevState.audio, blob],
            };
          else
            return {
              ...prevState,
              ...initialState,
            };
        });
      };
    }
    return () => {
      if (recorder)
        recorder.stream.getAudioTracks().forEach((track) => track.stop());
    };
  }, [mediaRecorder]);

  return {
    handleStartRecording,
    handleSaveRecording,
    handleCancelRecording,
    handleRemoveRecording,
  };
};
