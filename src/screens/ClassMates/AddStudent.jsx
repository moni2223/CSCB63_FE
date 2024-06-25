import React, { useEffect } from "react";
import Inputs from "../../components/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { addStudentMark, createStudent, createUser, editGrade, getAllGrades } from "../../actions";
import _ from "lodash";
import moment from "moment";
import { getAllParents } from "../../actions";
import AddStudentForm from "../../components/Forms/AddStudentForm";

const AddStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  }, []);

  useEffect(() => {
    Object.keys(errors)?.map((error) => toast.error(errors[error]?.label?.message || errors[error]?.value?.message));
  }, [errors]);

  const handleAddStudent = (e) => {
    const userPayload = {
      username: e?.username,
      password: e?.password,
      role: 2,
    };
    const studentPayload = {
      name: e?.name,
      email: e?.email,
      number: e?.number,
      parent_ids: e?.parents?.map((par) => par?.value),
      school_id: profile?.school?.id,
    };
    dispatch(
      createUser({
        ...userPayload,
        onSuccess: (res) => {
          dispatch(
            createStudent({
              ...studentPayload,
              onSuccess: (std) => {
                dispatch(
                  editGrade({
                    id: e?.grade?.value?.id,
                    body: {
                      student_ids: [...e?.grade?.value?.students?.map((student) => student?.id), std?.id],
                    },
                    onSuccess: (res) => {
                      toast.success("Студента е добавен успешно");
                      navigate(-1);
                    },
                  })
                );
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
          <h2 className="inner-title">Добавяне на ученик</h2>
        </div>
        <Inputs.Button text="Добави" className={"h-10 w-[130px] mr-4"} selected onClick={handleSubmit((e) => handleAddStudent(e))} />
      </div>
      <AddStudentForm control={control} setValue={setValue} errors={errors} register={register} watch={watch} parents={parents} grades={allGrades?.filter((grd) => grd?.school?.id === profile?.school?.id)} />
    </div>
  );
};

export default AddStudent;
