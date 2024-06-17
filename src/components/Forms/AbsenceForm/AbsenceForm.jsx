import React, { useState } from "react";
import Inputs from "../../Inputs";
import { Controller } from "react-hook-form";
import moment from "moment";

const absenceValues = [
  { label: "Уважително", value: 1 },
  { label: "Неуважително", value: 2 },
  { label: "Закъснение", value: 3 },
];

const AbsenceForm = ({ control, setValue, errors, register, students }) => {
  return (
    <div className="body-container" style={{ height: "unset" }}>
      <div className="flex w-full flex-wrap gap-4 mt-4">
        <Controller control={control} name={`subject`} render={({ field: { value, onChange }, fieldState: { error } }) => <Inputs.SingleAsyncSelect label={"Предмет"} outerClassName={"w-[350px]"} value={{ label: value?.name, value: value }} disabled />} />
        <Controller control={control} name={`status`} render={({ field: { value, onChange }, fieldState: { error } }) => <Inputs.SingleAsyncSelect label={"Вид на отсъствието"} compulsory outerClassName={"w-[350px]"} className={error} value={value} optionsArray={absenceValues} onChange={(e) => setValue("status", e)} />} />
        <Controller control={control} name={`student`} render={({ field: { value, onChange }, fieldState: { error } }) => <Inputs.SingleAsyncSelect label={"Ученик"} compulsory outerClassName={"w-[350px]"} className={error} value={value} optionsArray={students} onChange={(e) => setValue("student", e)} />} />
        <Controller control={control} name={`date`} render={({ field: { value }, fieldState: { error } }) => <Inputs.DatePicker label={"Дата"} outerClassName={"w-[350px] h-[70px]"} value={value && moment(value)?._d} onChange={(e) => setValue("date", moment(e).toISOString())} className={error && "failed"} maxDate={moment().toDate()} />} rules={{ required: true }} />
      </div>
      <p className="text-sm text-red-300 w-full mt-3">* Ако не изберете, автоматично ще бъде зададена днешната дата.</p>
    </div>
  );
};
export default AbsenceForm;
