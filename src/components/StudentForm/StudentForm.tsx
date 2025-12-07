import React from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { createStudent } from "../../api/api";
import { useStyles } from "./StudentForm.style";
import { FormikErrors, useFormik } from "formik";
import { isValidILId } from "../../utils/validations";
import { IStudentCreate } from "../../pages/Students/Students.types";
import { Box, TextField, Typography, FormControl, Button } from "@mui/material";

const StudentForm: React.FC = () => {
  const handleSubmit = async (values: IStudentCreate) => {
    const response = await createStudent(values);

    if (response.error) toast.error(response.error);
    else toast.info(`student ${response.id} was created`);
  };

  const studentSchema = Yup.object().shape({
    id: Yup.string()
      .test((value) => (value ? isValidILId(value) : false))
      .required(),
    firstName: Yup.string()
      .required()
      .matches(
        /^[a-zA-Z\u0590-\u05FF\u200f\u200e ']+$/,
        "no special characters allowed"
      ),
    lastName: Yup.string()
      .required()
      .matches(
        /^[a-zA-Z\u0590-\u05FF\u200f\u200e ']+$/,
        "no special characters allowed"
      ),
    age: Yup.number().integer().positive().nullable(),
    profession: Yup.string().required().max(30),
  });

  const formik = useFormik({
    initialValues: {
      id: "",
      firstName: "",
      lastName: "",
      age: undefined,
      profession: "",
    },
    validationSchema: studentSchema,
    validateOnChange: false,
    validateOnBlur: false,
    validate: (values) => {
      const errors: FormikErrors<{
        id: string;
        firstName: string;
        lastName: string;
        age: number;
        profession: string;
      }> = {};
      const combinedLength = values.firstName.length + values.lastName.length;

      if (combinedLength > 30) {
        errors.firstName = `length of fullname must be under 30 characters `;
        errors.lastName = `length of fullname must be under 30 characters `;
      }

      return errors;
    },
    onSubmit: handleSubmit,
  });
  const styles = useStyles();
  return (
    <Box style={styles.comp}>
      <Typography variant="h5">Create new student</Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl style={styles.form}>
          <TextField
            id="id"
            label="ID"
            value={formik.values.id}
            onChange={formik.handleChange}
            error={formik.errors.id ? true : false}
            helperText={formik.errors.id && "input must be a valid IL id"}
            color="info"
          />
          <TextField
            id="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.errors.firstName ? true : false}
            helperText={formik.errors.firstName}
            color="info"
          />

          <TextField
            id="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.errors.lastName ? true : false}
            helperText={formik.errors.lastName}
            color="info"
          />

          <TextField
            id="age"
            label="Age"
            value={formik.values.age}
            onChange={formik.handleChange}
            error={formik.errors.age ? true : false}
            helperText={formik.errors.age}
            color="info"
          />

          <TextField
            id="profession"
            label="Profession"
            value={formik.values.profession}
            onChange={formik.handleChange}
            error={formik.errors.profession ? true : false}
            helperText={formik.errors.profession}
            color="info"
          />

          <Button type="submit" variant="contained">
            Add Student
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default StudentForm;
