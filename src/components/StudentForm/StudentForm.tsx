import React from "react";
import { useFormik } from "formik";
import { useStyles } from "./StudentForm.style";
import { Box, TextField, Typography, FormControl, Button } from "@mui/material";

interface StudentForm {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  profession: string;
}

const StudentForm: React.FC = () => {
  const handleSubmit = (values: StudentForm) => {
    console.log(values);
    //TODO send POST request to api

    //TODO error handling
  };
  const formik = useFormik({
    initialValues: {
      id: "",
      firstName: "",
      lastName: "",
      age: 0,
      profession: "",
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
            required
            value={formik.values.id}
            onChange={formik.handleChange}
          />
          <TextField
            id="firstName"
            label="First Name"
            required
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />

          <TextField
            id="lastName"
            label="Last Name"
            required
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />

          <TextField
            id="age"
            label="Age"
            value={formik.values.age}
            onChange={formik.handleChange}
          />

          <TextField
            id="profession"
            label="Profession"
            required
            value={formik.values.profession}
            onChange={formik.handleChange}
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
