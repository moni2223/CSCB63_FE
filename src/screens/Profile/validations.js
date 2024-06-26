import * as Yup from "yup";

export const loginValidations = Yup.object().shape({
  email: Yup.string().email("Enter valid email").required().min(3).label("email"),
  username: Yup.string().required().min(3).label("username"),
  password: Yup.string().label("password"),
  number: Yup.string().required().min(3).label("number"),
});
export const schoolValidations = Yup.object().shape({
  name: Yup.string().required().min(3).label("name"),
  address: Yup.string().required().min(3).label("address"),
});

export const validations = { loginValidations, schoolValidations };
