import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput } from "../../form";
import { UserIcon } from "../../../resources/icons";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { PROFILE_CONSTANTS } from "../../../constants";

const schema = yup.object({
  pronunciation_name: yup.string().required("This field is required"),
});

const EditProfile = ({
  onSubmit = () => null,
  user = null,
  isLoading = null,
}) => {
  const isLoadingShow = isLoading === PROFILE_CONSTANTS.YOUR_PROFILE;
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    defaultValues: {
      pronunciation_name: "",
    },
    mode: "all",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user?.pronunciation_name) {
      setValue("pronunciation_name", user?.pronunciation_name);
    }
  }, [user?.pronunciation_name]);

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
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
                }}
              />
            )}
          />
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-danger w-25">
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
