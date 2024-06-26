import React, { useState } from "react";
import Inputs from "../../Inputs";

const EditStudentForm = ({ errors, register }) => {
  const [checkPassword, setCheckPassword] = useState(false);
  return (
    <div className="body-container" style={{ height: "unset" }}>
      <h1 className=" text-md font-bold uppercase">
        Основна информация <span className="font-medium text-sm italic">(ако запазите промените, ще трябва да влезете в профила си отново)</span>
      </h1>
      <div className="flex w-full flex-wrap gap-4 mt-4">
        <Inputs.TextInput label={"Потребителско име"} inputClassName={errors.username && "failed"} compulsory outerClassName={`w-[350px]`} {...register(`username`, { shouldValidate: true })} />
        <Inputs.TextInput label={"Нова парола"} inputClassName={errors.password && "failed"} compulsory outerClassName={`w-[350px]`} autoComplete="new-password" type={!checkPassword && "password"} suffix={<div className="icon see-password w-6 h-6 mr-3" onClick={() => setCheckPassword(!checkPassword)} />} {...register(`password`, { shouldValidate: true })} />
        <Inputs.TextInput label={"Имейл"} inputClassName={errors.email && "failed"} disabled compulsory outerClassName={`w-[350px]`} {...register(`email`, { shouldValidate: true })} />
        <Inputs.TextInput label={"Tелефонен номер"} inputClassName={errors.number && "failed"} disabled compulsory outerClassName={`w-[350px]`} {...register(`number`, { shouldValidate: true })} />
      </div>
    </div>
  );
};
export default EditStudentForm;
