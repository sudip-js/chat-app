import { loginWithGoogle, loginWithGithub } from "../firebase/authFunctions";

export const handleLoginWithProvider = async (provider) => {
  try {
    const response = await (provider === "google"
      ? loginWithGoogle()
      : loginWithGithub());
    return { response };
  } catch (error) {
    return { error: error?.message };
  }
};
