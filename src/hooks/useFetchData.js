import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebase";
import { notify } from "../helpers";

const initialState = {
  isLoading: false,
  data: [],
};
export const useFetchData = ({ collectionRef }) => {
  const user = useSelector(({ auth }) => auth.user);
  const [state, setState] = useState(initialState);
  const { isLoading, data } = state;
  const handleState = (newState) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };
  useEffect(() => {
    handleState({
      isLoading: true,
    });
    const usersCollectionRef = collection(db, collectionRef);
    const executeQuery = query(
      usersCollectionRef,
      where("firebase_uid", "!=", user?.firebase_uid)
    );
    const unsubscribe = onSnapshot(
      executeQuery,
      (querySnapshot) => {
        let tempUsers = [];
        querySnapshot.forEach((doc) => {
          tempUsers.push(doc.data());
        });
        handleState({
          isLoading: false,
          data: [...tempUsers],
        });
      },
      (error) => {
        console.error({ error: error });
        notify({
          message: "ERROR:Failed to fetch users.Please try again later.",
          type: "error",
        });
      }
    );

    return () => unsubscribe();
  }, []);

  return {
    isLoading,
    data,
  };
};
