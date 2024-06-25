import React, { useEffect } from "react";
import Inputs from "../../../components/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import { validations } from "./validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { addStudentMark, createUser, getAllGrades, getAllQualifications, getCurrentSchool, getSchoolSubjects, getStudentsForSchool } from "../../../actions";
import { useQuery } from "../../../hooks/useQuery";
import MarksForm from "../../../components/Forms/MarksForm/MarksForm";
import _ from "lodash";
import moment from "moment";
import { createTeacher } from "../../../actions";
import TeachersForm from "../../../components/Forms/TeachersForm";

const AddTeacher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, user } = useSelector(({ general }) => general);
  const { currentSchool, qualifications } = useSelector(({ schools }) => schools) || {};
  const { allGrades } = useSelector(({ grades }) => grades);

  const methods = useForm({
    shouldUnregister: false,
    // resolver: yupResolver(validations.MarksValidationSchema),
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
    if (profile?.id || profile?.school) {
      dispatch(getSchoolSubjects({ schoolId: profile?.school?.id }));
      dispatch(getCurrentSchool({ schoolId: profile?.school?.id }));
      dispatch(getAllQualifications());
      dispatch(getAllGrades());
    }
  }, [profile]);

  useEffect(() => {
    Object.keys(errors)?.map((error) => toast.error(errors[error]?.label?.message || errors[error]?.value?.message));
  }, [errors]);

  const handleAddTeacher = (e) => {
    const userPayload = {
      username: e?.username,
      password: e?.password,
      role: 1,
    };
    const teacherPayload = {
      name: e?.name,
      email: e?.email,
      qualification_ids: e?.qualifications?.map((qual) => qual?.value?.id),
      subject_ids: e?.subjects?.map((par) => par?.value),
      grade_ids: [e?.grade?.value?.id],
      school_id: profile?.school?.id,
    };
    dispatch(
      createUser({
        ...userPayload,
        onSuccess: () => {
          dispatch(
            createTeacher({
              ...teacherPayload,
              onSuccess: () => {
                toast.success("Учителя е добавен успешно");
                navigate(-1);
              },
            })
          );
        },
      })
    );
  };

  return (
    <div className="main-container" style={{ height: "92vh" }}>
      <div className="inner-header-container">
        <div className="left-part">
          <div className="icon close w-4 h-4 mx-2" onClick={() => navigate(-1)} />
          <h2 className="inner-title">Добавяне на учител</h2>
        </div>
        <Inputs.Button text="Добави" className={"h-10 w-[130px] mr-4"} selected onClick={handleSubmit((e) => handleAddTeacher(e))} />
      </div>
      <TeachersForm control={control} setValue={setValue} errors={errors} register={register} watch={watch} currentSchool={currentSchool} qualifications={qualifications} grades={allGrades?.filter((grd) => grd?.school?.id === profile?.school?.id)} subjects={currentSchool?.subjects} />
    </div>
  );
};

export default AddTeacher;
