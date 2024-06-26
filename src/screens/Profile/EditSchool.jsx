import React, { useEffect } from "react";
import Inputs from "../../components/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { validations } from "./validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { editSchool, getCurrentSchool } from "../../actions";
import SchoolForm from "../../components/Forms/SchoolForm";

const EditSchool = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, user } = useSelector(({ general }) => general);
  const { currentSchool } = useSelector(({ schools }) => schools);

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
    if (profile?.school && user?.id)
      dispatch(
        getCurrentSchool({
          schoolId: profile?.school?.id,
          onSuccess: (res) => {
            setValue("name", res?.name);
            setValue("address", res?.address);
          },
        })
      );
  }, [profile, user]);

  useEffect(() => {
    Object.keys(errors)?.map((error) => toast.error(errors[error]?.message));
  }, [errors]);

  const handleEditSchool = (e) => {
    const payload = {
      id: profile?.school?.id,
      body: { ...e },
      onSuccess: (res) => {
        toast.success("Училището е редактирано успешно!");
        navigate("/");
      },
    };
    dispatch(editSchool(payload));
  };

  return (
    <div className="main-container" style={{ height: "92vh" }}>
      <div className="inner-header-container">
        <div className="left-part">
          <div className="icon close w-4 h-4 mx-2" onClick={() => navigate(-1)} />
          <h2 className="inner-title">Редакция училище</h2>
        </div>
        <Inputs.Button text="Запази" className={"h-10 w-[130px] mr-4"} selected onClick={handleSubmit((e) => handleEditSchool(e))} />
      </div>
      <SchoolForm control={control} setValue={setValue} errors={errors} register={register} watch={watch} />
    </div>
  );
};

export default EditSchool;
