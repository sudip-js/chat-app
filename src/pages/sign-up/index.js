import React, { useRef, useState } from "react";
import {
  AuthFormFooter,
  AuthFormHeader,
  SocialAuthButton,
  SubmitButton,
  TextInput,
} from "../../components";
import {
  EmailIcon,
  GithubIcon,
  GoogleIcon,
  PasswordIcon,
  ProfileIcon,
  UserIcon,
} from "../../resources/icons";
import { signUpWithEmail } from "../../firebase/authFunctions";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../schema";
import { signUpInitialState } from "../../initialState/formInitialState";
import { notify } from "../../helpers";
import { Spinner } from "react-bootstrap";
import { handleLoginWithProvider } from "../../helpers/authHelper";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { login } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();
  const photoURLRef = useRef(null);
  const [state, setState] = useState({
    isLoading: false,
  });
  const { isLoading } = state;
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: signUpInitialState,
    mode: "all",
    resolver: yupResolver(signUpSchema),
  });

  const watchPhotoURL = watch("photo_url");

  const handleSocialAuth = async (provider) => {
    const result = await handleLoginWithProvider(provider);
    if (!result.response) {
      console.error({ errors: result?.error });
      notify({
        message: result.error,
        type: "error",
      });
    }
  };

  const handleChangePhotoURL = (e) => {
    const photo_url = e.target.files[0];
    setValue("photo_url", photo_url);
  };

  const handleSignUpWithEmail = async ({
    username,
    email,
    password,
    photo_url,
  }) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    try {
      const userCredential = await signUpWithEmail(email, password);
      const user = userCredential?.user;
      const { displayName, phoneNumber, photoURL, uid } = user;
      const docRef = doc(db, "users", uid);
      const storageRef = ref(storage, `profile/${uid}/${photo_url?.name}`);
      const response = await uploadBytes(storageRef, photo_url, {
        contentType: photo_url?.type ?? "",
      });
      const url = await getDownloadURL(
        ref(storage, response?.metadata?.fullPath)
      );
      await updateProfile(user, {
        displayName: username,
        photoURL: url,
      });
      const payload = {
        username: displayName ?? username,
        email: user?.email,
        phone_number: phoneNumber,
        photo_url: photoURL ?? url,
        firebase_uid: uid,
        create_at: serverTimestamp(),
        follow: false,
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
      notify({
        message: error?.message,
        type: "error",
      });
    } finally {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  return (
    <div className="account-pages my-5 pt-sm-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <AuthFormHeader
              {...{
                title: "Get started",
                desc: "Create a new account",
              }}
            />

            <div className="card">
              <div className="card-body p-4">
                <div className="p-3">
                  <div className="d-flex align-items-center flex-column gap-2 mb-2">
                    <SocialAuthButton
                      {...{
                        Icon: GoogleIcon,
                        title: "Continue with Google",
                        extraParams: {
                          className: "text-black bg-white",
                          onClick: () => handleSocialAuth("google"),
                        },
                      }}
                    />
                    <SocialAuthButton
                      {...{
                        Icon: GithubIcon,
                        title: "Continue with Github",
                        extraParams: {
                          className: "text-white bg-black",
                          onClick: () => handleSocialAuth("github"),
                        },
                      }}
                    />
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="text-white">OR</span>
                  </div>
                  <form onSubmit={handleSubmit(handleSignUpWithEmail)}>
                    <div className="mb-3">
                      <Controller
                        name="username"
                        control={control}
                        render={({ field }) => (
                          <TextInput
                            {...{
                              ...field,
                              label: "Username",
                              icon: UserIcon,
                              placeholder: "Enter username",
                              error: errors?.username?.message,
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className="mb-3">
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <TextInput
                            {...{
                              ...field,
                              label: "Email",
                              icon: EmailIcon,
                              placeholder: "Enter email",
                              error: errors?.email?.message,
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className="mb-3">
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <TextInput
                            {...{
                              ...field,
                              label: "Password",
                              icon: PasswordIcon,
                              placeholder: "Enter password",
                              type: "password",
                              error: errors?.password?.message,
                            }}
                          />
                        )}
                      />

                      <div className="mt-3">
                        <div className="input-group">
                          <label
                            htmlFor="photo_url"
                            className="d-flex align-items-center gap-2 cursor--pointer"
                          >
                            <ProfileIcon />
                            {watchPhotoURL ? (
                              <span>{watchPhotoURL?.name}</span>
                            ) : (
                              <span>Upload profile pic</span>
                            )}
                          </label>

                          <input
                            ref={photoURLRef}
                            onChange={handleChangePhotoURL}
                            id="photo_url"
                            type="file"
                            hidden
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-grid">
                      <SubmitButton disabled={isLoading} type="submit">
                        {isLoading ? <Spinner size="sm" /> : "Sign Up"}
                      </SubmitButton>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="mt-5 text-center">
              <AuthFormFooter
                {...{
                  title: "Already have an account?",
                  linkText: "Sign In",
                  link: "/",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
