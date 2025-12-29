import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import classroomApi from "../../api/api";
import { useStyles } from "./StudentForm.style";
import { fields } from "../../consts/studentFormFields";
import { Box, TextField, Typography, FormControl, Button } from "@mui/material";
import {
  studentSchema,
  validationCombinedLength,
} from "../../utils/validations";
import {
  IStudentCreate,
  IStudentFormvalues,
} from "../../pages/Students/Students.types";

const StudentForm: React.FC = () => {
  const handleSubmit = async (values: IStudentCreate) => {
    const response = await classroomApi.createStudent(values);

    if (response.error) toast.error(response.error);
    else toast.info(`student ${response.id} was created`);
  };

  const formik = useFormik<IStudentFormvalues>({
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
      <Typography style={styles.title} variant="h4">
        Add new student
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl style={styles.form}>
          {fields.map((field) => (
            <TextField
              key={field.id}
              style={styles.inputs}
              id={field.id}
              label={field.label}
              value={formik.values[field.id] ?? ""}
              onChange={formik.handleChange}
              error={formik.errors[field.id] ? true : false}
              helperText={formik.errors[field.id]}
              color="info"
            />
          ))}
          <Button type="submit" variant="contained" style={styles.submit}>
            Add Student
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default StudentForm;
