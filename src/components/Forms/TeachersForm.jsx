import React, { useState } from "react";
import Inputs from "../Inputs";
import { Controller } from "react-hook-form";

const TeachersForm = ({ errors, register, control, setValue, qualifications, grades, subjects, edit }) => {
  const [checkPassword, setCheckPassword] = useState(false);
  return (
    <div className="body-container" style={{ height: "unset" }}>
      <div className="flex w-full flex-wrap gap-4 mt-4">
        <Inputs.TextInput label={"Имена"} inputClassName={errors.username && "failed"} compulsory outerClassName={`w-[350px]`} {...register(`name`, { shouldValidate: true })} />
        {!edit && (
          <>
            <Inputs.TextInput label={"Потребителско име"} inputClassName={errors.username && "failed"} compulsory outerClassName={`w-[350px]`} {...register(`username`, { shouldValidate: true })} />
            <Inputs.TextInput label={"Парола"} inputClassName={errors.password && "failed"} compulsory outerClassName={`w-[350px]`} autoComplete="new-password" type={!checkPassword && "password"} suffix={<div className="icon see-password w-6 h-6 mr-3" onClick={() => setCheckPassword(!checkPassword)} />} {...register(`password`, { shouldValidate: true })} />
            <Inputs.TextInput label={"Имейл"} inputClassName={errors.email && "failed"} compulsory outerClassName={`w-[350px]`} {...register(`email`, { shouldValidate: true })} />
            <Inputs.TextInput label={"Tелефонен номер"} inputClassName={errors.number && "failed"} compulsory outerClassName={`w-[350px]`} {...register(`number`, { shouldValidate: true })} />
          </>
        )}
        <Controller
          control={control}
          name={`qualifications`}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Inputs.SingleAsyncSelect
              label={"Квалификации"}
              outerClassName="w-[530px]"
              complulsory
              value={value}
              multi
              optionsArray={
                qualifications &&
                qualifications?.map((qua) => ({
                  label: `${qua?.name}`,
                  value: qua,
                }))
              }
              onChange={(e) => setValue("qualifications", e)}
            />
          )}
        />
        <Controller
          control={control}
          name={`grade`}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Inputs.SingleAsyncSelect
              label={"Клас"}
              outerClassName="w-[530px]"
              complulsory
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

        <Controller
          control={control}
          name={`subjects`}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Inputs.SingleAsyncSelect
              label={"Предмети"}
              outerClassName="w-[530px]"
              value={value}
              complulsory
              multi
              optionsArray={
                subjects &&
                subjects?.map((sub) => ({
                  label: sub?.name,
                  value: sub?.id,
                }))
              }
              onChange={(e) => setValue("subjects", e)}
            />
          )}
        />
      </div>
    </div>
  );
};
export default TeachersForm;
