import React, { useState } from "react";
import Inputs from "../Inputs";
import { Controller } from "react-hook-form";

const AddStudentForm = ({ errors, register, control, watch, setValue, parents, grades, edit }) => {
  const [checkPassword, setCheckPassword] = useState(false);
  return (
    <div className="body-container" style={{ height: "unset" }}>
      <div className="flex w-full flex-wrap gap-4 mt-4">
        <Inputs.TextInput label={"Имена"} inputClassName={errors.username && "failed"} compulsory outerClassName={`w-[350px]`} {...register(`name`, { shouldValidate: true })} />
        <Inputs.TextInput label={"Имейл"} inputClassName={errors.email && "failed"} compulsory outerClassName={`w-[350px]`} {...register(`email`, { shouldValidate: true })} />
        <Inputs.TextInput label={"Tелефонен номер"} inputClassName={errors.number && "failed"} compulsory outerClassName={`w-[350px]`} {...register(`number`, { shouldValidate: true })} />
        {!edit && (
          <>
            {" "}
            <Inputs.TextInput label={"Потребителско име"} inputClassName={errors.username && "failed"} compulsory outerClassName={`w-[350px]`} {...register(`username`, { shouldValidate: true })} />
            <Inputs.TextInput label={"Парола"} inputClassName={errors.password && "failed"} compulsory outerClassName={`w-[350px]`} autoComplete="new-password" type={!checkPassword && "password"} suffix={<div className="icon see-password w-6 h-6 mr-3" onClick={() => setCheckPassword(!checkPassword)} />} {...register(`password`, { shouldValidate: true })} />
          </>
        )}
        {!edit && (
          <Controller
            control={control}
            name={`grade`}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Inputs.SingleAsyncSelect
                label={"Клас"}
                outerClassName="w-[350px]"
                value={value}
                optionsArray={
                  grades &&
                  grades?.map((grd) => ({
                    label: `${grd?.id}${grd?.grade}`,
                    value: grd,
                  }))
                }
                onChange={(e) => setValue("grade", e)}
              />
            )}
          />
        )}
        <Controller
          control={control}
          name={`parents`}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Inputs.SingleAsyncSelect
              label={"Родители"}
              outerClassName="w-[350px]"
              value={value}
              multi
              optionsArray={
                parents &&
                parents?.map((par) => ({
                  label: par?.name,
                  value: par?.id,
                }))
              }
              onChange={(e) => setValue("parents", e)}
            />
          )}
        />
      </div>
    </div>
  );
};
export default AddStudentForm;
