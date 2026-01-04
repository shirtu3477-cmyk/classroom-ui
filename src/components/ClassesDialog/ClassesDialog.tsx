import {
  selectOpenClasses,
  useClassesSelector,
} from "../../redux/selectors/classes";
import {
  Box,
  CardHeader,
  Typography,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";
import React, { useEffect } from "react";
import classroomApi from "../../api/api";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { useStyles } from "./ClassesDialog.style";
import GraduateHatIcon from "../../icons/GraduateHatIcon";
import { IStudent } from "../../pages/Students/Students.types";
import { addStudent, setClasses } from "../../redux/slices/classes";
import { isAxiosError } from "axios";

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
  const classes = useClassesSelector((state) => selectOpenClasses(state));

  const handleAssign = async (classId: number, className: string) => {
    if (!student) return;
    try {
      const response = await classroomApi.assignToClass(student.id, classId);
      toast.info(`student ${response.firstName} ${response.lastName} was assigned to ${className}`);

      const studentUpdated = { ...student, classId };
      dispatch(addStudent({ student: studentUpdated, classId }));
      handleClose();
    } catch (e) {
      if (isAxiosError(e)) toast.error(e.message);
    }
  };

  const fetchClasses = async () => {
    try {
      const classes = await classroomApi.getClasses();
      dispatch(setClasses(classes));
    } catch (e) {
      toast.error("classroom server is offline :(");
    }
  };

  useEffect(() => {
    if (classes.length === 0) fetchClasses();
  }, []);

  return (
    <Box>
      <Card style={styles.classes}>
        <CardHeader title="Avialable Classes"></CardHeader>
        <CardContent>
          {classes.length > 0 ? classes.map(({ classId, name }) => (
            <Box key={classId} style={styles.clas}>
              <GraduateHatIcon />
              <Box>
                <Typography>{name}</Typography>
              </Box>
              <IconButton
                onClick={() => handleAssign(classId, name)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <AddIcon color="primary" />
              </IconButton>
            </Box>
          )) : <Typography>No available classes</Typography>}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClassesDialog;
