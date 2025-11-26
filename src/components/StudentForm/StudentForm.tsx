import React from "react";
import { useStyles } from "./StudentForm.style";
import { Box, TextField, Typography, FormControl, Button } from "@mui/material";

const StudentForm: React.FC = () => {
    const styles = useStyles()
  return (
    <Box style={styles.comp}>
      <Typography variant="h5">Create new student</Typography>
      <FormControl style={styles.form}>
        <TextField label="ID" required />
        <TextField label="First Name" required />

        <TextField label="Last Name" required />

        <TextField label="Age" />

        <TextField label="Profession" required />

        <Button type="submit" variant="contained">Add Student</Button>
      </FormControl>
    </Box>
  );
};

export default StudentForm;
