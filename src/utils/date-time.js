import moment from "moment";

export const formateMessageTime = (timestamp) => {
  let formattedDate;
  const currentTime = moment();
  const dateFromTimestamp = moment.unix(timestamp);
  const differenceInDays = currentTime.diff(dateFromTimestamp, "days");

  if (differenceInDays === 0) {
    formattedDate = dateFromTimestamp.format("h:mm A"); // Today's message
  } else if (differenceInDays === 1) {
    formattedDate = dateFromTimestamp.format("[Yesterday at] h:mm A"); // Yesterday's message
  } else {
    formattedDate = dateFromTimestamp.format("D MMM, YYYY [at] h:mm A"); // Older messages
  }

  return formattedDate;
};

export const formatMinutes = (minutes) => {
  return minutes < 10 ? `0${minutes}` : minutes;
};

export const formatSeconds = (seconds) => {
  return seconds < 10 ? `0${seconds}` : seconds;
};
