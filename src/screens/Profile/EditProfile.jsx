import React, { useEffect, useState } from "react";
import Inputs from "../../components/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { validations } from "./validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import EditStudentForm from "../../components/Forms/ProfileForms/EditStudentForm";
import { editUser, logoutUser } from "../../actions";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, user } = useSelector(({ general }) => general);

  const methods = useForm({
    shouldUnregister: false,
    resolver: yupResolver(validations),
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
    if (profile?.id && user?.id) {
      setValue("username", user?.username);
      setValue("email", user?.email || profile?.email);
      setValue("number", profile?.number);
    }
  }, [profile, user]);

  useEffect(() => {
    Object.keys(errors)?.map((error) => toast.error(errors[error]?.message));
  }, [errors]);

  const handleEditStudent = (e) => {
    const payload = {
      id: user?.id,
      body: { username: e?.username, ...(e?.password && e?.password?.length > 3 && { password: e?.password }) },
      onSuccess: (res) => {
        toast.success("Редакцията е успешна!");
        dispatch(logoutUser());
      },
    };
    dispatch(editUser(payload));
  };

  return (
    <div className="main-container" style={{ height: "92vh" }}>
      <div className="inner-header-container">
        <div className="left-part">
          <div className="icon close w-4 h-4 mx-2" onClick={() => navigate(-1)} />
          <h2 className="inner-title">Редакция профил</h2>
        </div>
        <Inputs.Button text="Запази" className={"h-10 w-[130px] mr-4"} selected onClick={handleSubmit((e) => handleEditStudent(e))} />
      </div>
      <EditStudentForm control={control} setValue={setValue} errors={errors} register={register} watch={watch} edit />
    </div>
  );
};

export default EditProfile;
