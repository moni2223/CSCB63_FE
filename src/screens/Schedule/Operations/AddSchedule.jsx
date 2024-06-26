import React, { useEffect } from "react";
import Inputs from "../../../components/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import { validations } from "./validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import SchoolForm from "../../../components/Forms/SchoolForm";
import { addSchool, createSchedule, getSchoolSubjects, getSchoolTeachers, getStudentsForSchool } from "../../../actions";
import { useQuery } from "../../../hooks/useQuery";
import ScheduleForm from "../../../components/Forms/ScheduleForm";
import { validations } from "./validations";

const AddSchedule = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { type } = useQuery();
  const { profile, user } = useSelector(({ general }) => general);
  const { teachers, currentSchool } = useSelector(({ schools }) => schools) || [];
  const allStudents = useSelector(({ students }) => students?.students) || [];
  const methods = useForm({
    shouldUnregister: false,
    resolver: yupResolver(validations),
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = methods;

  useEffect(() => {
    Object.keys(errors)?.map((error) => toast.error(errors[error]?.message));
  }, [errors]);

  useEffect(() => {
    if (profile?.school) {
      setValue("type", type);
      setValue("school_id", profile?.school?.id);

      const payload = { schoolId: profile?.school?.id };
      if (type === "teacher") dispatch(getSchoolTeachers(payload));
      else {
        dispatch(getStudentsForSchool(payload));
        dispatch(getSchoolSubjects(payload));
      }
    }
  }, [type, profile]);

  const handleAddSchedule = (e) => {
    const payload = {
      school_id: e?.school_id,
      ...(e?.student_id && { student_id: e?.student_id }),
      ...(e?.teacher_id && { teacher_id: e?.teacher_id }),
      monday: e?.monday?.map((sub) => sub?.value?.id),
      tuesday: e?.tuesday?.map((sub) => sub?.value?.id),
      wednesday: e?.wednesday?.map((sub) => sub?.value?.id),
      thursday: e?.thursday?.map((sub) => sub?.value?.id),
      friday: e?.friday?.map((sub) => sub?.value?.id),
      onSuccess: (res) => {
        toast.success("Програмата беше добавена успешно!");
        navigate(-1);
      },
    };
    console.log(payload);
    dispatch(createSchedule(payload));
  };

  //   console.log(watch());

  return (
    <div className="main-container" style={{ height: "92vh" }}>
      <div className="inner-header-container">
        <div className="left-part">
          <div className="icon close w-4 h-4 mx-2" onClick={() => navigate(-1)} />
          <h2 className="inner-title">Добавяне на програма - {type === "student" ? "Ученик" : "Учител"}</h2>
        </div>
        <Inputs.Button text="Запази" className={"h-10 w-[130px] mr-4"} selected onClick={handleSubmit((e) => handleAddSchedule(e))} />
      </div>
      <ScheduleForm errors={errors} register={register} control={control} setValue={setValue} teachers={type === "teacher" && teachers} students={type === "student" && allStudents} subjects={currentSchool?.subjects} watch={watch} />
      {/* <SchoolForm control={control} setValue={setValue} errors={errors} register={register} watch={watch} /> */}
    </div>
  );
};

export default AddSchedule;
