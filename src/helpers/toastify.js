import { toast } from "react-toastify";
export const notify = ({ message, type }) => {
  toast(message, {
    position: "top-right",
    theme: "dark",
    type,
    autoClose: 2000,
  });
};
