import React, { useEffect } from "react";
import Inputs from "../../../components/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { validations } from "./validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { addStudentMark, deleteStudentMark, editCurrentMark, getAllGrades, getCurrentMark, getSchoolSubjects, getStudentsForSchool } from "../../../actions";
import { useQuery } from "../../../hooks/useQuery";
import MarksForm from "../../../components/Forms/MarksForm/MarksForm";
import _ from "lodash";
import moment from "moment";

const markValues = [
  { label: "Слаб 2", value: "2" },
  { label: "Среден 3", value: "3" },
  { label: "Добър 4", value: "4" },
  { label: "Много добър 5", value: "5" },
  { label: "Отличен 6", value: "6" },
];

const EditMark = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { markId } = useQuery();
  const { profile, user } = useSelector(({ general }) => general);
  const { gradesForTeacher } = useSelector(({ grades }) => grades) || {};
  const { currentSchool } = useSelector(({ schools }) => schools) || {};
  const { students } = useSelector(({ students }) => students) || {};

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
    if (profile?.id || profile?.school) {
      dispatch(getStudentsForSchool({ schoolId: profile?.school?.id }));
      dispatch(getSchoolSubjects({ schoolId: profile?.school?.id }));
      dispatch(
        getCurrentMark({
          id: markId,
          onSuccess: (res) => {
            const mark = res?.[0];
            setValue("date", mark?.date);
            setValue("subject", { label: mark?.subject?.name, value: mark?.subject });
            setValue("student", { label: mark?.student?.name, value: mark?.student });
            setValue("mark", markValues?.filter((mrk) => mrk?.value === mark?.mark)?.[0]);
          },
        })
      );
    }
  }, [profile]);

  useEffect(() => {
    Object.keys(errors)?.map((error) => toast.error(errors[error]?.label?.message || errors[error]?.value?.message));
  }, [errors]);

  const handleEditMark = (e) => {
    const payload = {
      id: markId,
      body: {
        date: e?.date || moment().toISOString(),
        subject_id: e?.subject?.value?.id || e?.subject?.id,
        student_id: e?.student?.value?.id,
        mark: e?.mark?.value,
      },
      onSuccess: (res) => {
        toast.success("Оценката е редактирана успешно!");
        navigate(-1);
      },
    };
    dispatch(editCurrentMark(payload));
  };
  const handleDeleteMark = (id) => {
    dispatch(
      deleteStudentMark({
        id: markId,
        onSuccess: () => {
          toast.success("Оценката е изтрита успешно!");
          navigate(-1);
        },
      })
    );
  };

  console.log(watch());

  return (
    <div className="main-container" style={{ height: "92vh" }}>
      <div className="inner-header-container">
        <div className="left-part">
          <div className="icon close w-4 h-4 mx-2" onClick={() => navigate(-1)} />
          <h2 className="inner-title">Редактиране на оценка</h2>
        </div>
        <Inputs.Button text="Изтрий" className={"h-10 delete w-[150px] mr-4"} onClick={handleDeleteMark} />
        <Inputs.Button text="Редактирай" className={"h-10 w-[150px] mr-4 green-selected"} onClick={handleSubmit((e) => handleEditMark(e))} />
      </div>
      <MarksForm control={control} setValue={setValue} errors={errors} register={register} watch={watch} currentSchool={currentSchool} students={students?.map((std) => ({ label: std?.name, value: std }))} />
    </div>
  );
};

export default EditMark;
