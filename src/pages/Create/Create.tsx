import React from "react";
import { Box } from "@mui/material";
import { useStyles } from "./Create.style";
import ClassForm from "../../components/ClassForm/ClassForm";
import StudentForm from "../../components/StudentForm/StudentForm";

const Create: React.FC = () => {
  const styles = useStyles();
  return (
    <Box style={styles.forms}>
      <ClassForm />
      <StudentForm />
    </Box>
  );
};

export default Create;
