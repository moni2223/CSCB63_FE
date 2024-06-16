import * as Yup from "yup";

export const loginValidations = Yup.object().shape({
  email: Yup.string().email("Enter valid email").required().min(3).label("email"),
  username: Yup.string().required().min(3).label("username"),
  password: Yup.string().label("password"),
  number: Yup.string().required().min(3).label("number"),
});

export const validations = loginValidations;
