import React, { useState } from "react";
import Inputs from "../Inputs";

const SchoolForm = ({ errors, register }) => {
  return (
    <div className="body-container" style={{ height: "unset" }}>
      <div className="flex w-full flex-wrap gap-4 mt-4">
        <Inputs.TextInput label={"Име"} inputClassName={errors.name && "failed"} compulsory outerClassName={`w-[350px]`} {...register(`name`, { shouldValidate: true })} />
        <Inputs.TextInput label={"Адрес"} inputClassName={errors.address && "failed"} compulsory outerClassName={`w-[350px]`} {...register(`address`, { shouldValidate: true })} />
      </div>
    </div>
  );
};
export default SchoolForm;
