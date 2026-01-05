import {
  studentSchema,
  validationCombinedLength,
} from "../../utils/validations";
import {
  IStudentCreate,
  IStudentFormvalues,
} from "../../pages/Students/Students.types";
import React from "react";
import { useFormik } from "formik";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import classroomApi from "../../api/api";
import { useStyles } from "./StudentForm.style";
import { fields } from "../../consts/studentFormFields";
import { Box, TextField, Typography, FormControl, Button } from "@mui/material";

const StudentForm: React.FC = () => {
  const handleSubmit = async (values: IStudentCreate) => {
    try {
      const response = await classroomApi.createStudent({
        ...values,
        age: values.age ? values.age : null,
      });
      toast.info(
        `student ${response.firstName} ${response.lastName} was created`
      );
      formik.resetForm()
    } catch (e) {
      if (isAxiosError(e)) toast.error(e.message);
    }
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
          {fields.map(({ id, label }) => (
            <TextField
              key={id}
              style={styles.inputs}
              id={id}
              label={label}
              value={formik.values[id] ?? ""}
              onChange={formik.handleChange}
              error={!!formik.errors[id]}
              helperText={formik.errors[id]}
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
