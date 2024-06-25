import React, { useEffect, useState } from "react";
import Inputs from "../../components/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { addStudentMark, createStudent, createUser, deleteStudent, editGrade, editStudent, getAllGrades, getCurrentStudent } from "../../actions";
import _ from "lodash";
import moment from "moment";
import { getAllParents } from "../../actions";
import AddStudentForm from "../../components/Forms/AddStudentForm";
import { useQuery } from "../../hooks/useQuery";

const EditStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { studentId } = useQuery();

  const { profile, user, parents } = useSelector(({ general }) => general);
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
    dispatch(getAllParents());
    dispatch(getAllGrades());
    dispatch(
      getCurrentStudent({
        id: studentId,
        onSuccess: (res) => {
          setValue("name", res?.name);
          setValue("email", res?.email);
          setValue("number", res?.number);
          setValue(
            "parents",
            res?.parents?.map((par) => ({ label: par?.name, value: par?.id }))
          );
        },
      })
    );
  }, []);

  useEffect(() => {
    Object.keys(errors)?.map((error) => toast.error(errors[error]?.label?.message || errors[error]?.value?.message));
  }, [errors]);

  const handleEditStudent = (e) => {
    const studentPayload = {
      name: e?.name,
      email: e?.email,
      number: e?.number,
      parent_ids: e?.parents?.map((par) => par?.value),
      school_id: profile?.school?.id,
    };
    dispatch(
      editStudent({
        id: studentId,
        body: { ...studentPayload },
        onSuccess: (res) => {
          toast.success("Студента беше редактиран успешно!");
          navigate(-1);
        },
      })
    );
  };
  const handleDeleteStudent = (e) => {
    dispatch(
      deleteStudent({
        id: studentId,
        onSuccess: (res) => {
          toast.success("Студента беше изтрит успешно!");
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
          <h2 className="inner-title">Редактиране на ученик</h2>
        </div>
        <Inputs.Button text="Добави" className={"h-10 w-[130px] mr-4 delete"} onClick={handleDeleteStudent} />
        <Inputs.Button text="Добави" className={"h-10 w-[130px] mr-4"} selected onClick={handleSubmit((e) => handleEditStudent(e))} />
      </div>
      <AddStudentForm control={control} setValue={setValue} errors={errors} register={register} watch={watch} parents={parents} grades={allGrades?.filter((grd) => grd?.school?.id === profile?.school?.id)} edit />
    </div>
  );
};

export default EditStudent;
