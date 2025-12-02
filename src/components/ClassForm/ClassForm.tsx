import React from "react";
import { useFormik } from "formik";
import { useStyles } from "./ClassForm.style";
import { Box, TextField, Typography, FormControl, Button } from "@mui/material";
import { createClass } from "../../api/api";
import { toast } from "react-toastify";

interface ClassForm {
  id: number;
  name: string;
  maxSeats: number;
}

const ClassForm: React.FC = () => {
  const styles = useStyles();
  const handleSubmit = async (values: ClassForm) => {
    const response = await createClass({ classId: values.id, ...values });

    if(response.data) toast.info(`Class ${response.data.id} was created`)
    else toast.error(response.error)
  };
  const formik = useFormik({
    initialValues: { id: 0, name: "", maxSeats: 0 },
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
            type="number"
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
            create class
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default ClassForm;
