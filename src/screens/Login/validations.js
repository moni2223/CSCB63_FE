import * as Yup from "yup";

export const loginValidations = Yup.object().shape({
  userName: Yup.string().required().min(3).label("userName"),
  password: Yup.string().required().min(3).label("password"),
});

export const validations = loginValidations;
