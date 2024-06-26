import React, { useState } from "react";
import Inputs from "../Inputs";
import { Controller } from "react-hook-form";

const ScheduleForm = ({ errors, register, control, setValue, qualifications, students, subjects, teachers, watch }) => {
  return (
    <div className="body-container" style={{ height: "unset" }}>
      <div className="flex w-full flex-wrap gap-4 mt-4">
        <Controller
          control={control}
          name={teachers ? `teacher` : `student`}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Inputs.SingleAsyncSelect
              label={teachers ? "Учител" : "Ученик"}
              outerClassName="w-[430px]"
              compulsory
              value={value}
              optionsArray={
                teachers
                  ? teachers?.map((teach) => ({
                      label: `${teach?.name}`,
                      value: teach,
                    }))
                  : students?.map((std) => ({
                      label: `${std?.name}`,
                      value: std,
                    }))
              }
              onChange={(e) => {
                if (teachers) {
                  setValue("teacher", e);
                  setValue("teacher_id", e?.value?.id);
                } else {
                  setValue("student", e);
                  setValue("student_id", e?.value?.id);
                }
              }}
            />
          )}
          rules={{ required: true }}
        />
        {watch("teacher") || watch("student") ? (
          <>
            {" "}
            <Controller
              control={control}
              name={`monday`}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Inputs.SingleAsyncSelect label={"Понеделник"} outerClassName="w-[430px]" compulsory multi value={value} optionsArray={teachers ? teachers?.find((teach) => teach?.id === watch("teacher")?.value?.id)?.subjects?.map((sub) => ({ label: sub?.name, value: sub })) : subjects?.map((sub) => ({ label: sub?.name, value: sub }))} onChange={(e) => setValue("monday", e)} />
              )}
              rules={{ required: true }}
            />
            <Controller
              control={control}
              name={`tuesday`}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Inputs.SingleAsyncSelect label={"Вторник"} outerClassName="w-[430px]" compulsory multi value={value} optionsArray={teachers ? teachers?.find((teach) => teach?.id === watch("teacher")?.value?.id)?.subjects?.map((sub) => ({ label: sub?.name, value: sub })) : subjects?.map((sub) => ({ label: sub?.name, value: sub }))} onChange={(e) => setValue("tuesday", e)} />
              )}
              rules={{ required: true }}
            />
            <Controller
              control={control}
              name={`wednesday`}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Inputs.SingleAsyncSelect label={"Сряда"} outerClassName="w-[430px]" compulsory multi value={value} optionsArray={teachers ? teachers?.find((teach) => teach?.id === watch("teacher")?.value?.id)?.subjects?.map((sub) => ({ label: sub?.name, value: sub })) : subjects?.map((sub) => ({ label: sub?.name, value: sub }))} onChange={(e) => setValue("wednesday", e)} />
              )}
              rules={{ required: true }}
            />
            <Controller
              control={control}
              name={`thursday`}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Inputs.SingleAsyncSelect label={"Четвъртък"} outerClassName="w-[430px]" compulsory multi value={value} optionsArray={teachers ? teachers?.find((teach) => teach?.id === watch("teacher")?.value?.id)?.subjects?.map((sub) => ({ label: sub?.name, value: sub })) : subjects?.map((sub) => ({ label: sub?.name, value: sub }))} onChange={(e) => setValue("thursday", e)} />
              )}
              rules={{ required: true }}
            />
            <Controller
              control={control}
              name={`friday`}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Inputs.SingleAsyncSelect label={"Петък"} outerClassName="w-[430px]" compulsory multi value={value} optionsArray={teachers ? teachers?.find((teach) => teach?.id === watch("teacher")?.value?.id)?.subjects?.map((sub) => ({ label: sub?.name, value: sub })) : subjects?.map((sub) => ({ label: sub?.name, value: sub }))} onChange={(e) => setValue("friday", e)} />
              )}
              rules={{ required: true }}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};
export default ScheduleForm;
