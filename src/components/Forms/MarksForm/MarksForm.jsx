import React, { useState } from "react";
import Inputs from "../../Inputs";
import { Controller } from "react-hook-form";
import moment from "moment";

const markValues = [
  { label: "Слаб 2", value: "2" },
  { label: "Среден 3", value: "3" },
  { label: "Добър 4", value: "4" },
  { label: "Много добър 5", value: "5" },
  { label: "Отличен 6", value: "6" },
];

const MarksForm = ({ control, setValue, errors, register, students, subject, currentSchool }) => {
  return (
    <div className="body-container" style={{ height: "unset" }}>
      <div className="flex w-full flex-wrap gap-4 mt-4">
        <Controller
          control={control}
          name={`subject`}
          render={({ field: { value, onChange }, fieldState: { error } }) => <Inputs.SingleAsyncSelect label={"Предмет"} optionsArray={currentSchool?.subjects && currentSchool?.subjects?.map((sbj) => ({ label: sbj?.name, value: sbj }))} outerClassName={"w-[350px]"} value={subject ? { label: value?.name, value: value } : value} disabled={subject} onChange={(e) => setValue("subject", e)} />}
        />
        <Controller control={control} name={`mark`} render={({ field: { value, onChange }, fieldState: { error } }) => <Inputs.SingleAsyncSelect label={"Оценка"} compulsory outerClassName={"w-[350px]"} className={error} value={value} optionsArray={markValues} onChange={(e) => setValue("mark", e)} />} />
        <Controller control={control} name={`student`} render={({ field: { value, onChange }, fieldState: { error } }) => <Inputs.SingleAsyncSelect label={"Ученик"} compulsory outerClassName={"w-[350px]"} className={error} value={value} optionsArray={students} onChange={(e) => setValue("student", e)} />} />
        <Controller control={control} name={`date`} render={({ field: { value }, fieldState: { error } }) => <Inputs.DatePicker label={"Дата"} outerClassName={"w-[350px] h-[70px]"} value={value && moment(value)?._d} onChange={(e) => setValue("date", moment(e).toISOString())} className={error && "failed"} maxDate={moment().toDate()} />} rules={{ required: true }} />
      </div>
      <p className="text-sm text-red-300 w-full mt-3">* Ако не изберете, автоматично ще бъде зададена днешната дата.</p>
    </div>
  );
};
export default MarksForm;
