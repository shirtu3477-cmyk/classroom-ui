import React from "react";
import { toast } from "react-toastify";
import classroomApi from "../../api/api";
import { useDispatch } from "react-redux";
import TrashIcon from "../../icons/TrashIcon";
import PersonIcon from "../../icons/PersonIcon";
import { useStyles } from "./StudentsDialog.style";
import { addStudent, removeStudent } from "../../redux/slices/classes";
import { IStudent } from "../../pages/Students/Students.types";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { isAxiosError } from "axios";

interface IStudentDialogProps {
  students: IStudent[];
}

const StudentsDialog: React.FC<IStudentDialogProps> = ({ students }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const handleDelete = async (studentId: string, classId: number) => {
    const student = students.find(({ id }) => id === studentId);
    try {
      dispatch(removeStudent({ studentId, classId }));
      const response = await classroomApi.unAssignClass(studentId);
      toast.info(`student ${response.firstName} ${response.lastName} was deleted from class ${classId}`);
    } catch (e) {
      if (isAxiosError(e)) toast.error(e.message);
      dispatch(addStudent({ student: student, classId }));
    }
  };

  return (
    <Card style={styles.students}>
      <CardHeader title="Class Students"></CardHeader>
      <CardContent>
        {students.length > 0 ? (
          students.map((student) => (
            <Box key={student.id} style={styles.student}>
              <PersonIcon />
              <Box>
                <Typography>{`${student.firstName} ${student.lastName}`}</Typography>
              </Box>
              <IconButton
                onClick={() => handleDelete(student.id, student.classId)}
              >
                <TrashIcon />
              </IconButton>
            </Box>
          ))
        ) : (
          <Typography>No students in this class</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentsDialog;
