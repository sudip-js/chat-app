import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PhoneNumberInput, TextInput } from "../../form";
import { EmailIcon, PhoneIcon } from "../../../resources/icons";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useEffect } from "react";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { PROFILE_CONSTANTS } from "../../../constants";

const schema = yup.object({
  phone: yup.string().required("Phone is required"),
});

const EditContactInformation = ({
  onSubmit = () => null,
  user = null,
  isLoading = null,
}) => {
  const isLoadingShow = isLoading === PROFILE_CONSTANTS.CONTACT_INFORMATION;
  const [phoneError, setPhoneError] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      phone: "",
    },
    mode: "all",
    resolver: yupResolver(schema),
  });
  const watchPhone = watch("phone");

  useEffect(() => {
    if (watchPhone) {
      if (
        !isPossiblePhoneNumber(watchPhone) ||
        !isValidPhoneNumber(watchPhone)
      ) {
        setPhoneError("Invalid Phone Number");
      } else {
        setPhoneError(null);
      }
    } else {
      setPhoneError(null);
    }
  }, [watchPhone]);

  useEffect(() => {
    if (user?.phone_number) {
      setValue("phone", user?.phone_number);
    }
  }, [user?.phone_number]);

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <TextInput
            {...{
              label: "Email Address",
              icon: EmailIcon,
              value: user?.email,
              disabled: true,
            }}
          />
        </div>
        <div className="mb-3">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneNumberInput
                {...{
                  ...field,
                  label: "Phone",
                  icon: PhoneIcon,
                  placeholder: "Enter Phone Number",
                  error: errors?.phone?.message,
                  isError: phoneError,
                  onChange: (phone) =>
                    setValue("phone", phone, {
                      shouldValidate: true,
                    }),
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
            disabled={isLoadingShow || Boolean(phoneError)}
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

export default EditContactInformation;
