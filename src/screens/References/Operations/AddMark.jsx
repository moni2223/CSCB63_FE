import React, { useEffect } from "react";
import Inputs from "../../../components/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { validations } from "./validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { addStudentMark, getAllGrades } from "../../../actions";
import { useQuery } from "../../../hooks/useQuery";
import MarksForm from "../../../components/Forms/MarksForm/MarksForm";
import _ from "lodash";
import moment from "moment";

const AddMark = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { subject } = useQuery();
  const { profile, user } = useSelector(({ general }) => general);
  const { gradesForTeacher } = useSelector(({ grades }) => grades) || {};

  const methods = useForm({
    shouldUnregister: false,
    resolver: yupResolver(validations.MarksValidationSchema),
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
    setValue("subject", JSON.parse(subject));
  }, [subject]);

  useEffect(() => {
    if (profile?.id) dispatch(getAllGrades(profile?.grades?.map((grd) => grd?.id)));
  }, [profile]);

  useEffect(() => {
    Object.keys(errors)?.map((error) => toast.error(errors[error]?.label?.message || errors[error]?.value?.message));
  }, [errors]);

  const handleAddMark = (e) => {
    const payload = {
      date: e?.date || moment().toISOString(),
      subject_id: e?.subject?.id,
      student_id: e?.student?.value?.id,
      mark: e?.mark?.value,
      onSuccess: (res) => {
        toast.success("Оценката е добавена успешно!");
        navigate(-1);
      },
    };
    console.log(payload);
    dispatch(addStudentMark(payload));
  };

  return (
    <div className="main-container" style={{ height: "92vh" }}>
      <div className="inner-header-container">
        <div className="left-part">
          <div className="icon close w-4 h-4 mx-2" onClick={() => navigate(-1)} />
          <h2 className="inner-title">Добавяне на оценка</h2>
        </div>
        <Inputs.Button text="Добави" className={"h-10 w-[130px] mr-4"} selected onClick={handleSubmit((e) => handleAddMark(e))} />
      </div>
      <MarksForm control={control} setValue={setValue} errors={errors} register={register} watch={watch} students={_.uniqBy(_.flatMap(gradesForTeacher, "students"), "id")?.map((std) => ({ label: std?.name, value: std }))} />
    </div>
  );
};

export default AddMark;
