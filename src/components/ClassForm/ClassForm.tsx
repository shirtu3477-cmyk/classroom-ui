import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import classroomApi from "../../api/api";
import { useDispatch } from "react-redux";
import { useStyles } from "./ClassForm.style";
import { addClass } from "../../redux/slices/classes";
import { classSchema } from "../../utils/validations";
import { fields } from "../../consts/classFormFields";
import { Box, TextField, Typography, FormControl, Button } from "@mui/material";
import { IClassCreate, IClassFormvalues } from "../../pages/Classes/Classes.types";

const ClassForm: React.FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = async (values: IClassCreate) => {
    const response = await classroomApi.createClass(values);

    if (response.error) toast.error(response.error);
    else {
      dispatch(
        addClass({
          ...response,
          students: [],
        })
      );
      toast.info(`Class ${response.classId} was created`);
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
            create class
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default ClassForm;
