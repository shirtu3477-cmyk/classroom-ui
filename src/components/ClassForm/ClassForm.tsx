import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { createClass } from "../../api/api";
import { useStyles } from "./ClassForm.style";
import { isClassIdValid } from "../../utils/validations";
import { IClassCreate } from "../../pages/Classes/Classes.types";
import { Box, TextField, Typography, FormControl, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addClass } from "../../redux/slices/classes";

const ClassForm: React.FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = async (values: IClassCreate) => {
    const response = await createClass(values);

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

  const classSchema = Yup.object().shape({
    classId: Yup.string()
      .test((value) => (value ? isClassIdValid(value) : false))
      .required(),
    name: Yup.string()
      .max(30)
      .matches(
        /^[a-zA-Z\u0590-\u05FF\u200f\u200e ']+$/,
        "no special characters allowed"
      )
      .required(),
    maxSeats: Yup.number().integer().positive().required(),
  });

  const formik = useFormik({
    initialValues: { classId: "", name: "", maxSeats: 0 },
    validationSchema: classSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });
  return (
    <Box style={styles.comp}>
      <Typography variant="h5">Create new class</Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl style={styles.form}>
          <TextField
            id="classId"
            label="Class ID"
            value={formik.values.classId}
            onChange={formik.handleChange}
            error={formik.errors.classId ? true : false}
            helperText={formik.errors.classId}
            color="info"
          />
          <TextField
            id="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors.name ? true : false}
            helperText={formik.errors.name}
            color="info"
          />
          <TextField
            id="maxSeats"
            label="Max Seats"
            value={+formik.values.maxSeats}
            onChange={formik.handleChange}
            error={formik.errors.maxSeats ? true : false}
            helperText={formik.errors.maxSeats}
            color="info"
          />
          <Button type="submit" variant="contained">
            create class
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default ClassForm;
