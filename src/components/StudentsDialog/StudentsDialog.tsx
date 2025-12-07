import React from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { unAssignClass } from "../../api/api";
import TrashIcon from "../../icons/TrashIcon";
import { useStyles } from "./StudentsDialog.style";
import { removeStudent } from "../../redux/slices/classes";
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

interface IStudentDialogProps {
  students: IStudent[];
  handleClose: () => void;
}

const StudentsDialog: React.FC<IStudentDialogProps> = ({
  students,
  handleClose,
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const handleDelete = async (studentId: string, classId: number) => {
    const response = await unAssignClass(studentId);

    if (response.error) toast.error(response.error);
    else toast.info(`student ${response.id} was deleted from class ${classId}`);

    dispatch(removeStudent({studentId, classId}))
    handleClose();
  };

  return (
    <Card style={styles.students}>
      <CardHeader title="Class Students"></CardHeader>
      <CardContent>
        {students.map((student) => (
          <Box key={student.id} style={styles.student}>
            <AccountCircleIcon fontSize="large" color="disabled" />
            <Box style={styles.name}>
              <Typography>{`${student.firstName} ${student.lastName}`}</Typography>
            </Box>
            <IconButton
              onClick={() => handleDelete(student.id, student.classId)}
            >
              <TrashIcon />
            </IconButton>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default StudentsDialog;
