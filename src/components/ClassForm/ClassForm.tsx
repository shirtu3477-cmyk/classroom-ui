import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import classroomApi from "../../api/api";
import { useDispatch } from "react-redux";
import { useStyles } from "./ClassForm.style";
import { addClass } from "../../redux/slices/classes";
import { classSchema } from "../../utils/validations";
import { IClassCreate } from "../../pages/Classes/Classes.types";
import { Box, TextField, Typography, FormControl, Button } from "@mui/material";

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

  const formik = useFormik({
    initialValues: { classId: "", name: "", maxSeats: null },
    validationSchema: classSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });
  return (
    <Box style={styles.formBox}>
      <Typography style={styles.title} variant="h4">Create new class</Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl style={styles.form}>
          <TextField
            style={styles.inputs}
            id="classId"
            label="Class ID *"
            value={formik.values.classId}
            onChange={formik.handleChange}
            error={formik.errors.classId ? true : false}
            helperText={formik.errors.classId}
            color="info"
          />
          <TextField
            style={styles.inputs}
            id="name"
            label="Name *"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors.name ? true : false}
            helperText={formik.errors.name}
            color="info"
          />
          <TextField
            style={styles.inputs}
            id="maxSeats"
            label="Max Seats *"
            value={formik.values.maxSeats}
            onChange={formik.handleChange}
            error={formik.errors.maxSeats ? true : false}
            helperText={formik.errors.maxSeats}
            color="info"
          />
          <Button type="submit" variant="contained" style={styles.submit}>
            create class
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default ClassForm;
