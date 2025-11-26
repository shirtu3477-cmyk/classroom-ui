import React from "react";
import { useStyles } from "./ClassForm.style";
import { Box, TextField, Typography, FormControl, Button } from "@mui/material";

const ClassForm: React.FC = () => {
  const styles = useStyles();
  return (
    <Box style={styles.comp}>
      <Typography variant="h5">Create new class</Typography>
      <FormControl style={styles.form}>
        <TextField label="Class ID" required />
        <TextField label="Name" required />
        <TextField label="Max Seates" required />
        <Button type="submit" variant="contained">
          Add Student
        </Button>
      </FormControl>
    </Box>
  );
};

export default ClassForm;
