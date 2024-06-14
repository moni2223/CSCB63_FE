import * as Yup from "yup";

export const loginValidations = Yup.object().shape({
  username: Yup.string().required().min(3).label("username"),
  password: Yup.string().required().min(3).label("password"),
});

export const validations = loginValidations;
