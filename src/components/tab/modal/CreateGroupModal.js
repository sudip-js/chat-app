import React from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "../../form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactSelect from "react-select";

const groupChatInitialState = {
  name: "",
  description: "",
};

export const groupChatSchema = yup.object({
  name: yup.string().required("Group name is required"),
  description: yup.string().required("Group description is required"),
});

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const CreateGroupModal = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: groupChatInitialState,
    mode: "all",
    resolver: yupResolver(groupChatSchema),
  });

  const handleCreateGroupChat = () => {};

  return (
    <form onSubmit={handleSubmit(handleCreateGroupChat)}>
      <div className="mb-3">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextInput
              {...{
                ...field,
                label: "Group Name",
                placeholder: "Enter name",
                error: errors?.name?.message,
              }}
            />
          )}
        />
      </div>
      <div className="mb-3">
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextInput
              {...{
                ...field,
                label: "Group Description",
                placeholder: "Enter description",
                error: errors?.description?.message,
              }}
            />
          )}
        />
      </div>
      <div className="mb-3">
        <Controller
          name="participants"
          control={control}
          render={({ field }) => (
            <>
              <label className="form-label">Select Participants</label>
              <ReactSelect
                value={field.value}
                onChange={field?.onChange}
                options={options}
                isMulti
                isSearchable
                placeholder="Select"
                noOptionsMessage={() => (
                  <span>No Participants are found please try again later</span>
                )}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? "#36404a" : "#36404a",
                    background: "#343A40",
                  }),
                }}
              />
            </>
          )}
        />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger w-25">
          Close
        </button>
        <button type="submit" className="btn btn-primary w-25">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreateGroupModal;
