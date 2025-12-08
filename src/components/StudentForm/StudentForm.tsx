import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import classroomApi from "../../api/api";
import { useStyles } from "./StudentForm.style";
import { formErrors } from "../../consts/formErrors";
import { IStudentCreate } from "../../pages/Students/Students.types";
import { Box, TextField, Typography, FormControl, Button } from "@mui/material";
import { studentSchema, validationCombinedLength } from "../../utils/validations";


const StudentForm: React.FC = () => {
  const handleSubmit = async (values: IStudentCreate) => {
    const response = await classroomApi.createStudent(values);

    if (response.error) toast.error(response.error);
    else toast.info(`student ${response.id} was created`);
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      firstName: "",
      lastName: "",
      age: null,
      profession: "",
    },
    validationSchema: studentSchema,
    validateOnChange: false,
    validateOnBlur: false,
    validate: validationCombinedLength,
    onSubmit: handleSubmit,
  });
  const styles = useStyles();
  return (
    <Box style={styles.formBox}>
      <Typography variant="h5">Create new student</Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl style={styles.form}>
          <TextField
            id="id"
            label="ID *"
            value={formik.values.id}
            onChange={formik.handleChange}
            error={formik.errors.id ? true : false}
            helperText={formik.errors.id && formErrors.VALID_ID}
            color="info"
          />
          <TextField
            id="firstName"
            label="First Name *"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.errors.firstName ? true : false}
            helperText={formik.errors.firstName}
            color="info"
          />

          <TextField
            id="lastName"
            label="Last Name *"
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
            label="Profession *"
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
