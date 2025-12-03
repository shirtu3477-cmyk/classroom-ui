import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { createStudent } from "../../api/api";
import { useStyles } from "./StudentForm.style";
import { isValidILId } from "../../utils/validations";
import { IStudentCreate } from "../../pages/Students/Students.types";
import { Box, TextField, Typography, FormControl, Button } from "@mui/material";


const StudentForm: React.FC = () => {
  const handleSubmit = async (values: IStudentCreate) => {
    const response = await createStudent(values);

    if (response.data) toast.info(`student ${response.data.id} was created`);
    else toast.error(response.error);
  };

  const studentSchema = Yup.object().shape({
    id: Yup.string().test((value) => (value ? isValidILId(value) : false)),
    firstName: Yup.string(),
    lastName: Yup.string(),
    age: Yup.number(),
    profession: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      id: "",
      firstName: "",
      lastName: "",
      age: 0,
      profession: "",
    },
    validationSchema: studentSchema,
    validateOnChange: true,
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
            required
            value={formik.values.id}
            onChange={formik.handleChange}
            error={formik.errors.id ? true : false}
            helperText={formik.errors.id && "input must be a valid IL id"}
            color="info"
          />
          <TextField
            id="firstName"
            label="First Name"
            required
            value={formik.values.firstName}
            onChange={formik.handleChange}
            color="info"
          />

          <TextField
            id="lastName"
            label="Last Name"
            required
            value={formik.values.lastName}
            onChange={formik.handleChange}
            color="info"
          />

          <TextField
            id="age"
            label="Age"
            value={formik.values.age}
            onChange={formik.handleChange}
            color="info"
          />

          <TextField
            id="profession"
            label="Profession"
            required
            value={formik.values.profession}
            onChange={formik.handleChange}
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
