import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { ref } from "firebase/database";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const handleAddUser = async ({
    userCredential = null,
    photo_url = null,
    username = null,
  }) => {
    let url = null;
    try {
      const user = userCredential?.user;
      const { displayName, phoneNumber, photoURL, uid } = user;
      const docRef = doc(db, "users", uid);
      if (photo_url) {
        const storageRef = ref(storage, `profile/${uid}/${photo_url?.name}`);
        const response = await uploadBytes(storageRef, photo_url, {
          contentType: photo_url?.type ?? "",
        });
        url = await getDownloadURL(ref(storage, response?.metadata?.fullPath));
      }
      if (username) {
        await updateProfile(user, {
          displayName: username,
        });
      }

      if (photo_url && url) {
        await updateProfile(user, {
          photoURL: url,
        });
      }
      const payload = {
        username: displayName ?? username,
        email: user?.email,
        phone_number: phoneNumber,
        photo_url: photoURL ?? url,
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
          photo_url: photoURL ?? url,
          firebase_uid: uid,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };
  return {
    handleAddUser,
  };
};
