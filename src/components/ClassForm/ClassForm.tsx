import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { createClass } from "../../api/api";
import { useStyles } from "./ClassForm.style";
import { isClassIdValid } from "../../utils/validations";
import { IClassCreate } from "../../pages/Classes/Classes.types";
import { Box, TextField, Typography, FormControl, Button } from "@mui/material";

const ClassForm: React.FC = () => {
  const styles = useStyles();
  const handleSubmit = async (values: IClassCreate) => {
    const response = await createClass(values);

    if (response.data) toast.info(`Class ${response.data.id} was created`);
    else toast.error(response.error);
  };

  const classSchema = Yup.object().shape({
    classId: Yup.string().test((value) =>
      value ? isClassIdValid(value) : false
    ),
    name: Yup.string()
      .max(30)
      .matches(/^[a-zA-Z\u0590-\u05FF\u200f\u200e ']+$/),
  });

  const formik = useFormik({
    initialValues: { classId: "", name: "", maxSeats: 0 },
    validationSchema: classSchema,
    validateOnChange: true,
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
            type="string"
            required
            value={formik.values.classId}
            onChange={formik.handleChange}
            color="info"
          />
          <TextField
            id="name"
            label="Name"
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            color="info"
          />
          <TextField
            id="maxSeats"
            label="Max Seats"
            type="number"
            required
            value={formik.values.maxSeats}
            onChange={formik.handleChange}
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
