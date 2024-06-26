import React, { useEffect } from "react";
import Inputs from "../../components/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { validations } from "./validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import SchoolForm from "../../components/Forms/SchoolForm";
import { addSchool } from "../../actions";

const AddSchool = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, user } = useSelector(({ general }) => general);

  const methods = useForm({
    shouldUnregister: false,
    resolver: yupResolver(validations.schoolValidations),
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

  const handleAddSchool = (e) => {
    const payload = {
      ...e,
      onSuccess: (res) => {
        toast.success("Училището е добавено успешно!");
        navigate("/");
      },
    };
    console.log(payload);
    dispatch(addSchool(payload));
  };

  return (
    <div className="main-container" style={{ height: "92vh" }}>
      <div className="inner-header-container">
        <div className="left-part">
          <div className="icon close w-4 h-4 mx-2" onClick={() => navigate(-1)} />
          <h2 className="inner-title">Добавяне на училище</h2>
        </div>
        <Inputs.Button text="Запази" className={"h-10 w-[130px] mr-4"} selected onClick={handleSubmit((e) => handleAddSchool(e))} />
      </div>
      <SchoolForm control={control} setValue={setValue} errors={errors} register={register} watch={watch} />
    </div>
  );
};

export default AddSchool;
