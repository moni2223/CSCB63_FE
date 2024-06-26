import * as Yup from "yup";

const scheduleSchema = Yup.object().shape({
  type: Yup.string().oneOf(["student", "teacher"]).required(),
  school_id: Yup.number().required(),
  student_id: Yup.number().when("type", {
    is: "student",
    then: Yup.number().required(),
    otherwise: Yup.number().nullable().oneOf([null]),
  }),
  teacher_id: Yup.number()
    .nullable()
    .when("type", {
      is: "teacher",
      then: Yup.number().required(),
      otherwise: Yup.number().nullable().oneOf([null]),
    }),
    monday: Yup.array().min(1, 'Monday must have at least one element').required('Monday is required'),
    tuesday: Yup.array().min(1, 'Tuesday must have at least one element').required('Tuesday is required'),
    wednesday: Yup.array().min(1, 'Wednesday must have at least one element').required('Wednesday is required'),
    thursday: Yup.array().min(1, 'Thursday must have at least one element').required('Thursday is required'),
    friday: Yup.array().min(1, 'Friday must have at least one element').required('Friday is required')
});

export const validations = scheduleSchema;
