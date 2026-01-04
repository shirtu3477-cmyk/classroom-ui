import React from "react";
import { useFormik } from "formik";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import classroomApi from "../../api/api";
import { useDispatch } from "react-redux";
import { useStyles } from "./ClassForm.style";
import { addClass } from "../../redux/slices/classes";
import { classSchema } from "../../utils/validations";
import { fields } from "../../consts/classFormFields";
import { Box, TextField, Typography, FormControl, Button } from "@mui/material";
import {
  IClassCreate,
  IClassFormvalues,
} from "../../pages/Classes/Classes.types";

const ClassForm: React.FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = async (values: IClassCreate) => {
    try {
      const response = await classroomApi.createClass(values);
      dispatch(
        addClass({
          ...response,
          students: [],
        })
      );
      toast.info(`Class ${response.name} was created`);
      formik.resetForm();
    } catch (e) {
      if (isAxiosError(e)) toast.error(e.message);
    }
  };

  const formik = useFormik<IClassFormvalues>({
    initialValues: { classId: "", name: "", maxSeats: null },
    validationSchema: classSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  return (
    <Box style={styles.formBox}>
      <Typography style={styles.title} variant="h4">
        Create new class
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
            create class
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default ClassForm;
