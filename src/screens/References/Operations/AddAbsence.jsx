import React, { useEffect } from "react";
import Inputs from "../../../components/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { validations } from "./validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { addStudentAbsence, addStudentMark, getAllGrades, getSchoolSubjects, getStudentsForSchool } from "../../../actions";
import { useQuery } from "../../../hooks/useQuery";
import MarksForm from "../../../components/Forms/MarksForm/MarksForm";
import _ from "lodash";
import moment from "moment";
import AbsenceForm from "../../../components/Forms/AbsenceForm/AbsenceForm";

const AddAbsence = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { subject } = useQuery();
  const { profile, user } = useSelector(({ general }) => general);
  const { gradesForTeacher } = useSelector(({ grades }) => grades) || {};
  const { currentSchool } = useSelector(({ schools }) => schools) || {};
  const { students } = useSelector(({ students }) => students) || {};

  const methods = useForm({
    shouldUnregister: false,
    resolver: yupResolver(validations.AbsenceValidationSchema),
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
    if (!subject && (profile?.id || profile?.school)) {
      dispatch(getStudentsForSchool({ schoolId: profile?.school?.id }));
      dispatch(getSchoolSubjects({ schoolId: profile?.school?.id }));
    }
  }, [profile]);

  useEffect(() => {
    if (subject) setValue("subject", JSON.parse(subject));
  }, [subject]);

  useEffect(() => {
    if (profile?.id) dispatch(getAllGrades(profile?.grades?.map((grd) => grd?.id)));
  }, [profile]);

  useEffect(() => {
    Object.keys(errors)?.map((error) => toast.error(errors[error]?.label?.message || errors[error]?.value?.message));
  }, [errors]);

  const handleAddAbsence = (e) => {
    const payload = {
      date: e?.date || moment().toISOString(),
      subject_id: e?.subject?.value?.id || e?.subject?.id,
      student_id: e?.student?.value?.id,
      status: Number(e?.status?.value),
      onSuccess: (res) => {
        toast.success("Отсъствието е добавена успешно!");
        navigate(-1);
      },
    };
    dispatch(addStudentAbsence(payload));
  };

  return (
    <div className="main-container" style={{ height: "92vh" }}>
      <div className="inner-header-container">
        <div className="left-part">
          <div className="icon close w-4 h-4 mx-2" onClick={() => navigate(-1)} />
          <h2 className="inner-title">Добавяне на отсъствие</h2>
        </div>
        <Inputs.Button text="Добави" className={"h-10 w-[130px] mr-4"} selected onClick={handleSubmit((e) => handleAddAbsence(e))} />
      </div>
      <AbsenceForm control={control} setValue={setValue} errors={errors} register={register} watch={watch} subject={subject} currentSchool={currentSchool} students={user?.role?.name === "Teacher" ? _.uniqBy(_.flatMap(gradesForTeacher, "students"), "id")?.map((std) => ({ label: std?.name, value: std })) : students?.map((std) => ({ label: std?.name, value: std }))} />
    </div>
  );
};

export default AddAbsence;
