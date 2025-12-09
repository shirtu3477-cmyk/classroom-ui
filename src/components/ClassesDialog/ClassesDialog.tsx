import React from "react";
import { toast } from "react-toastify";
import classroomApi from "../../api/api";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { useStyles } from "./ClassesDialog.style";
import { addStudent } from "../../redux/slices/classes";
import GraduateHatIcon from "../../icons/GraduateHatIcon";
import { IStudent } from "../../pages/Students/Students.types";
import { selectOpenClasses, useClassesSelector } from "../../redux/selectors/classes";
import {
  Box,
  CardHeader,
  Typography,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";

interface IClassDialogProps {
  student: IStudent | null;
  handleClose: () => void;
}

const ClassesDialog: React.FC<IClassDialogProps> = ({
  student,
  handleClose,
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const classes = useClassesSelector(state => selectOpenClasses(state))

  const handleAssign = async (classId: number) => {
    if (!student) return;

    const response = await classroomApi.assignToClass(student.id, classId);

    if (response.error) toast.error(response.error);
    else {
      toast.info(`student ${response.id} was assigned to ${classId}`);

      const studentUpdated = { ...student, classId };
      dispatch(addStudent({ student: studentUpdated, classId }));
    }
    handleClose();
  };

  return (
    <Box>
      <Card style={styles.classes}>
        <CardHeader title="Avialable Classes"></CardHeader>
        <CardContent>
          {classes.map((clas) => (
            <Box key={clas.classId} style={styles.clas}>
              <GraduateHatIcon />
              <Box>
                <Typography>{clas.name}</Typography>
              </Box>
              <IconButton
                onClick={() => handleAssign(clas.classId)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <AddIcon color="primary" />
              </IconButton>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClassesDialog;
