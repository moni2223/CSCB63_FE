import React, { useEffect } from "react";
import Inputs from "../../../components/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import { validations } from "./validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { addStudentMark, createUser, deleteTeacher, editTeacher, editUser, getAllGrades, getAllQualifications, getCurrentSchool, getCurrentTeacher, getSchoolSubjects, getStudentsForSchool } from "../../../actions";
import { useQuery } from "../../../hooks/useQuery";
import MarksForm from "../../../components/Forms/MarksForm/MarksForm";
import _ from "lodash";
import moment from "moment";
import { createTeacher } from "../../../actions";
import TeachersForm from "../../../components/Forms/TeachersForm";

const EditTeacher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teacherId } = useQuery();
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
      dispatch(
        getCurrentTeacher({
          id: teacherId,
          onSuccess: (res) => {
            const teacher = res?.[0];
            setValue("name", teacher?.name);
            setValue(
              "qualifications",
              teacher?.qualifications?.map((qua) => ({ label: qua?.name, value: qua }))
            );
            setValue(
                "subjects",
                teacher?.subjects?.map((sub) => ({ label: sub?.name, value: sub }))
              );
            setValue("grade", { label:`${teacher?.grades?.[0]?.id}${teacher?.grades?.[0]?.name}` , value: teacher?.grades?.[0] });
            console.log(res);
          },
        })
      );
      dispatch(getSchoolSubjects({ schoolId: profile?.school?.id }));
      dispatch(getCurrentSchool({ schoolId: profile?.school?.id }));
      dispatch(getAllQualifications());
      dispatch(getAllGrades());
    }
  }, [profile]);

  useEffect(() => {
    Object.keys(errors)?.map((error) => toast.error(errors[error]?.label?.message || errors[error]?.value?.message));
  }, [errors]);

  const handleEditTeacher = (e) => {
    const teacherPayload = {
      name: e?.name,
      email: e?.email,
      qualification_ids: e?.qualifications?.map((qual) => qual?.value?.id),
      subject_ids: e?.subjects?.map((sub) => sub?.value?.id),
      grade_ids: [e?.grade?.value?.id],
      school_id: profile?.school?.id,
    };
    dispatch(
      editTeacher({
        id: teacherId,
        body: { ...teacherPayload },
        onSuccess: () => {
          toast.success("Учителя е редактиран успешно");
          navigate(-1);
        },
      })
    );
  };
  const handleDeleteTeacher = () => {
    dispatch(
      deleteTeacher({
        id: teacherId,
        onSuccess: () => {
          toast.success("Учителя е изтрит успешно");
          navigate(-1);
        },
      })
    );
  };
  return (
    <div className="main-container" style={{ height: "92vh" }}>
      <div className="inner-header-container">
        <div className="left-part">
          <div className="icon close w-4 h-4 mx-2" onClick={() => navigate(-1)} />
          <h2 className="inner-title">Редакция на учител</h2>
        </div>
        <Inputs.Button text="Изтрий" className={"h-10 w-[130px] mr-4 delete"} onClick={handleDeleteTeacher} />
        <Inputs.Button text="Запази" className={"h-10 w-[130px] mr-4"} selected onClick={handleSubmit((e) => handleEditTeacher(e))} />
      </div>
      <TeachersForm control={control} setValue={setValue} errors={errors} register={register} watch={watch} currentSchool={currentSchool} qualifications={qualifications} grades={allGrades?.filter((grd) => grd?.school?.id === profile?.school?.id)} subjects={currentSchool?.subjects} edit />
    </div>
  );
};

export default EditTeacher;
