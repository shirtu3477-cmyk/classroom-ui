import * as Yup from "yup";
import { FormikErrors } from "formik";
import { formErrors } from "../consts/formErrors";
import { IStudentFormvalues } from "../pages/Students/Students.types";

const isValidILId = (testId: string) => {
  const id = String(testId).trim();

  if (id.length > 9 || id.length < 5 || isNaN(parseInt(id))) return false;

  const paddedId = id.length < 9 ? ("00000000" + id).slice(-9) : id;

  return (
    Array.from(paddedId, Number).reduce((counter, digit, i) => {
      const step = digit * ((i % 2) + 1);
      return counter + (step > 9 ? step - 9 : step);
    }) %
      10 ===
    0
  );
};

const isClassIdValid = (classId: string) => {
  const intId = parseInt(classId);

  if (intId < 0 || isNaN(intId)) return false;

  const first = classId.charAt(0);

  return first ? parseInt(first) != 0 : false;
};

const hasLeadingZero = (
  value: number | null | undefined,
  context: Yup.TestContext<Yup.AnyObject>
) => value ? !context.originalValue.startsWith("0") : true;

export const studentSchema = Yup.object().shape({
  id: Yup.string()
    .test("is-valid-il-id", formErrors.VALID_ID, (value) =>
      value ? isValidILId(value) : false
    )
    .required(),
  firstName: Yup.string()
    .required()
    .matches(
      /^[a-zA-Z\u0590-\u05FF\u200f\u200e ']+$/,
      formErrors.SPECIAL_CHARS
    ),
  lastName: Yup.string()
    .required()
    .matches(
      /^[a-zA-Z\u0590-\u05FF\u200f\u200e ']+$/,
      formErrors.SPECIAL_CHARS
    ),
  age: Yup.number()
    .integer()
    .positive()
    .nullable()
    .test("leading-zero", formErrors.LEADING_ZERO, hasLeadingZero),
  profession: Yup.string().required().max(30),
});

export const classSchema = Yup.object().shape({
  classId: Yup.string()
    .test((value) => (value ? isClassIdValid(value) : false))
    .required(),
  name: Yup.string()
    .max(30)
    .matches(/^[a-zA-Z\u0590-\u05FF\u200f\u200e ']+$/, formErrors.SPECIAL_CHARS)
    .required(),
  maxSeats: Yup.number()
    .integer()
    .positive()
    .required()
    .test("leading-zero", formErrors.LEADING_ZERO, hasLeadingZero),
});

export const validationCombinedLength = (values: {
  firstName: string;
  lastName: string;
}) => {
  const errors: FormikErrors<IStudentFormvalues> = {};
  const combinedLength = values.firstName.length + values.lastName.length;

  if (combinedLength > 30) {
    errors.firstName = formErrors.MAX_LENGTH_30;
    errors.lastName = formErrors.MAX_LENGTH_30;
  }

  return errors;
};
