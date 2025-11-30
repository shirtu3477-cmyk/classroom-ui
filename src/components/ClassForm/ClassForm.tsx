import React from "react";
import { useFormik } from "formik";
import { useStyles } from "./ClassForm.style";
import { Box, TextField, Typography, FormControl, Button } from "@mui/material";

interface ClassForm {
  id: string;
  name: string;
  maxSeats: number;
}

const ClassForm: React.FC = () => {
  const styles = useStyles();
  const handleSubmit = (values: ClassForm) => {
    console.log(values);
    //TODO send POST request to api

    //TODO error handling
  };
  const formik = useFormik({
    initialValues: { id: "", name: "", maxSeats: 0 },
    onSubmit: handleSubmit,
  });
  return (
    <Box style={styles.comp}>
      <Typography variant="h5">Create new class</Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl style={styles.form}>
          <TextField
            id="id"
            label="Class ID"
            required
            value={formik.values.id}
            onChange={formik.handleChange}
          />
          <TextField
            id="name"
            label="Name"
            required
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <TextField
            id="maxSeats"
            label="Max Seats"
            type="number"
            required
            value={formik.values.maxSeats}
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

export default ClassForm;
