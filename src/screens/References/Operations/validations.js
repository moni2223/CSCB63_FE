import * as Yup from "yup";

const MarksValidationSchema = Yup.object().shape({
  mark: Yup.object()
    .shape({
      label: Yup.string().required("Mark label is required"),
      value: Yup.string().required("Mark value is required"),
    })
    .required("Mark is required"),
  student: Yup.object()
    .shape({
      label: Yup.string().required("Student label is required"),
      value: Yup.object().required("Student value is required"),
    })
    .required("Student is required"),
});
const AbsenceValidationSchema = Yup.object().shape({
  status: Yup.object()
    .shape({
      label: Yup.string().required("Status label is required"),
      value: Yup.string().required("Status value is required"),
    })
    .required("Status is required"),
  student: Yup.object()
    .shape({
      label: Yup.string().required("Student label is required"),
      value: Yup.object().required("Student value is required"),
    })
    .required("Student is required"),
});

export const validations = { AbsenceValidationSchema, MarksValidationSchema };
