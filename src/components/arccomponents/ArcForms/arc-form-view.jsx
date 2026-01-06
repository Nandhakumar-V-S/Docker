import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ArcTextBox from "./ArcTextbox/ArcTextbox";
import ArcForm from "./ArcForm";

export const emailPattern = {
  value: new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$", "ig"),
  message: "Enter a valid email address,",
};

export const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [name, setName] = useState("");
  const handleInputChange = (e) => {
    setName(e.target.value);
  };
  const onSubmit = handleSubmit((data) => {
    console.log("submitting...");
    console.log(data);
  });

  return (
    <>
      <ArcForm onSubmit={onSubmit}>
        <ArcTextBox
          id="firstName"
          type="text"
          name="firstName"
          label="First Name"
          placeholder="First Name"
          className="as"
          register={register}
          rules={{ required: "First Name" }}
          errors={errors}
        />
        <p>{name}</p>
        <ArcTextBox
          id="lastName"
          type="text"
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
          className="mb-2"
          //   register={register}
          defaultValue=""
          //   rules={{ required: "Last Name" }}
          errors={errors}
          value={name}
          onChange={handleInputChange}
        />

        <ArcTextBox
          id="email"
          type="email"
          name="email"
          label="Email Address"
          placeholder="Email Address"
          className="mb-2"
          register={register}
          rules={{
            required: "Email Address",
            pattern: emailPattern,
          }}
          errors={errors}
        />
        <button type="submit">Submit</button>
      </ArcForm>
    </>
  );
};

export default RegistrationForm;
