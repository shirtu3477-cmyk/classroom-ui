import React from "react";
import { IStudent } from "../../pages/Students/Students.types";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import TrashIcon from "../../icons/TrashIcon";
import { useStyles } from "./StudentsDialog.style";

interface IStudentDialogProps {
  students: IStudent[];
}

const StudentsDialog: React.FC<IStudentDialogProps> = ({ students }) => {
  const styles = useStyles();
  return (
    <Box>
      <Card style={styles.students}>
        <CardHeader title="Class Students"></CardHeader>
        <CardContent>
          {students.map((student) => (
            <Box key={student.id} style={styles.student}>
              <AccountCircleIcon fontSize="large" color="disabled" />
              <Box style={styles.name}>
                <Typography>{`${student.firstName} ${student.lastName}`}</Typography>
              </Box>
              <IconButton>
                <TrashIcon />
              </IconButton>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentsDialog;
