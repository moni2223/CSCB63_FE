import React, { useEffect, useState } from "react";
import Inputs from "../../components/Inputs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validations } from "./validations";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./styles.scss";
import { loginUser } from "../../actions";

const Login = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkPassword, setCheckPassword] = useState(false);

  const methods = useForm({ shouldUnregister: false, resolver: yupResolver(validations), mode: "onSubmit" });
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = methods;

  useEffect(() => {
    // console.log(errors);
  }, [errors]);

  const handleContinueButton = handleSubmit((e) => {
    dispatch(
      loginUser({
        ...e,
        onSuccess: (res) => {
          toast.success("Login successfully!");
          // navigate("/");
        },
      })
    );
  });

  return (
    <div className="login-container">
      <div className="flex flex-col items-center h-5/6 w-1/3 bg-white rounded-md">
        <div className="logo my-10" />
        <div className="flex items-center font-bold text-2xl uppercase">Вход в системата</div>
        <p className="font-normal text-sm text-center my-6">Моля въведете вашето потребителско име и парола</p>
        <div className="flex flex-col justify-between items-center h-1/2 w-full">
          <div className="w-full flex flex-col items-center justify-center">
            <Inputs.TextInput label={"Потребителско име"} autoComplete="new-password" outerClassName={`w-5/6 mt-4`} {...register(`username`, { shouldValidate: true })} />
            <Inputs.TextInput label={"Парола"} autoComplete="new-password" type={!checkPassword && "password"} suffix={<div className="icon see-password w-6 h-6 mr-3" onClick={() => setCheckPassword(!checkPassword)} />} outerClassName={`w-5/6 my-4`} {...register(`password`, { shouldValidate: true })} />
          </div>
          <Inputs.Button text={"Вход"} selected className={`w-5/6 mt-4`} disabled={!watch("userName")?.length && !watch("password")?.length} onClick={handleContinueButton} />
        </div>
      </div>
    </div>
  );
};
export default Login;
