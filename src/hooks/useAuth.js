import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const handleAddUser = async ({ userCredential = null, username = null }) => {
    console.log({ userCredential, username });
    try {
      const user = userCredential?.user ?? {};
      const {
        displayName = null,
        phoneNumber = null,
        photoURL = null,
        uid = null,
        email = null,
      } = user;
      if (uid) {
        const docRef = doc(db, "users", uid);
        const tempUserName = displayName || username || email;
        if (username) {
          await updateProfile(user, {
            displayName: username,
          });
        }
        const payload = {
          username: tempUserName,
          email,
          phone_number: phoneNumber,
          photo_url: photoURL ?? null,
          firebase_uid: uid,
          create_at: serverTimestamp(),
          follow: false,
          online: true,
          updated_at: serverTimestamp(),
        };
        await setDoc(docRef, payload);
        dispatch(
          login({
            username: displayName ?? username,
            email: user?.email,
            phone_number: phoneNumber,
            photo_url: photoURL ?? null,
            firebase_uid: uid,
          })
        );
      }
    } catch (error) {
      console.error({ error });
    }
  };
  return {
    handleAddUser,
  };
};
