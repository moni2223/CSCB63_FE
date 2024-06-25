import React, { useEffect } from "react";
import Inputs from "../../../components/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { validations } from "./validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { deleteCurrentAbsence, editCurrentAbsence, getCurrentAbsence, getSchoolSubjects, getStudentsForSchool } from "../../../actions";
import _ from "lodash";
import moment from "moment";
import AbsenceForm from "../../../components/Forms/AbsenceForm/AbsenceForm";
import { useQuery } from "../../../hooks/useQuery";

const absenceValues = [
  { label: "Уважително", value: 1 },
  { label: "Неуважително", value: 2 },
  { label: "Закъснение", value: 3 },
];

const EditAbsence = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { absenceId } = useQuery();
  const { profile } = useSelector(({ general }) => general);
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
    if (profile?.id || profile?.school) {
      dispatch(getStudentsForSchool({ schoolId: profile?.school?.id }));
      dispatch(getSchoolSubjects({ schoolId: profile?.school?.id }));
      dispatch(
        getCurrentAbsence({
          id: absenceId,
          onSuccess: (res) => {
            const absence = res?.[0];
            setValue("date", absence?.date);
            setValue("subject", { label: absence?.subject?.name, value: absence?.subject });
            setValue("student", { label: absence?.student?.name, value: absence?.student });
            setValue("status", absenceValues?.filter((abs) => abs?.value === absence?.status)?.[0]);
          },
        })
      );
    }
  }, [profile]);

  useEffect(() => {
    Object.keys(errors)?.map((error) => toast.error(errors[error]?.label?.message || errors[error]?.value?.message));
  }, [errors]);

  const handleEditAbsence = (e) => {
    const payload = {
      id: absenceId,
      body: { date: moment(e?.date).add(5, "hour") || moment().toISOString(), subject_id: e?.subject?.value?.id || e?.subject?.id, student_id: e?.student?.value?.id, status: Number(e?.status?.value) },
      onSuccess: (res) => {
        toast.success("Отсъствието е редактирано успешно!");
        navigate(-1);
      },
    };
    dispatch(editCurrentAbsence(payload));
  };

  const handleDeleteAbsence = () => {
    dispatch(
      deleteCurrentAbsence({
        id: absenceId,
        onSuccess: (res) => {
          toast.success("Отсъствието е изтрито успешно");
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
          <h2 className="inner-title">Редактиране на отсъствие</h2>
        </div>
        <Inputs.Button text="Изтрий" className={"h-10 delete w-[150px] mr-4"} onClick={handleDeleteAbsence} />
        <Inputs.Button text="Редактирай" className={"h-10 w-[150px] mr-4 green-selected"} onClick={handleSubmit((e) => handleEditAbsence(e))} />
      </div>
      <AbsenceForm control={control} setValue={setValue} errors={errors} register={register} watch={watch} currentSchool={currentSchool} students={students?.map((std) => ({ label: std?.name, value: std }))} />
    </div>
  );
};

export default EditAbsence;
