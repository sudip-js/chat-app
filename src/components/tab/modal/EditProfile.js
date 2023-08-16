import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput } from "../../form";
import { EditImageIcon, UserIcon } from "../../../resources/icons";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { PROFILE_CONSTANTS } from "../../../constants";
import TestImage from "../../../resources/images/avatar-profile.png";
import { useSelector } from "react-redux";

const schema = yup.object({
  pronunciation_name: yup.string().required("This field is required"),
});

const EditProfile = ({
  onSubmit = () => null,
  user = null,
  isLoading = null,
  hide = () => null,
}) => {
  const userDetails = useSelector(({ auth }) => auth?.user);
  const inputFileRef = useRef(null);
  const [fileBlob, setFileBlob] = useState(null);
  const isLoadingShow = isLoading === PROFILE_CONSTANTS.YOUR_PROFILE;
  const profileImage = fileBlob || userDetails?.photo_url || TestImage;
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    defaultValues: {
      pronunciation_name: "",
      photo_url: null,
    },
    mode: "all",
    resolver: yupResolver(schema),
  });

  const onchangeFileInput = (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    setFileBlob(URL.createObjectURL(file));
    setValue("photo_url", file);
  };

  const handleRemovePhoto = () => {
    setValue("photo_url", null);
    setFileBlob(null);
  };

  useEffect(() => {
    if (!user && !Object.keys(user)?.length > 0) return;
    setValue("pronunciation_name", user?.pronunciation_name);
    return () => {
      setFileBlob(null);
      if (inputFileRef?.current?.value) {
        inputFileRef.current.value = null;
      }
    };
  }, [user]);

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-column align-items-center mb-2">
          <div className="profile-image-container">
            <input
              hidden
              type="file"
              ref={inputFileRef}
              onChange={onchangeFileInput}
              accept="image/*"
            />
            <img src={profileImage} alt="Avatar" className="image" />
            {!isLoading && (
              <div
                className="edit-icon"
                onClick={() => inputFileRef?.current?.click()}
              >
                <EditImageIcon className="large-font" />
              </div>
            )}
          </div>
          {fileBlob && (
            <button
              className="btn btn-outline-danger my-2"
              onClick={handleRemovePhoto}
              disabled={isLoadingShow}
            >
              Remove Photo
            </button>
          )}
        </div>
        <div className="mb-3">
          <Controller
            name="pronunciation_name"
            control={control}
            render={({ field }) => (
              <TextInput
                {...{
                  ...field,
                  label: "Name Pronunciation ",
                  icon: UserIcon,
                  placeholder: "Zoe (pronounced 'zo-ee')",
                  error: errors?.pronunciation_name?.message,
                  disabled: isLoadingShow,
                }}
              />
            )}
          />
        </div>

        <div className="modal-footer">
          <button
            disabled={isLoadingShow}
            type="button"
            className="btn btn-danger w-25"
            onClick={hide}
          >
            Close
          </button>
          <button
            disabled={isLoadingShow}
            type="submit"
            className="btn btn-primary w-25"
          >
            {isLoadingShow ? (
              <span>
                <Spinner size="sm" />
              </span>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditProfile;
