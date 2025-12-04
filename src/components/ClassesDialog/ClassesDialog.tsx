import React from "react";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import { assignToClass } from "../../api/api";
import { useStyles } from "./ClassesDialog.style";
import SchoolIcon from "@mui/icons-material/School";
import { useClassesSelector } from "../../redux/selectors/classes";
import {
  Box,
  CardHeader,
  Typography,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";

interface IClassDialogProps {
  studentId: string;
}

const ClassesDialog: React.FC<IClassDialogProps> = ({ studentId }) => {
  const styles = useStyles();
  const classes = useClassesSelector((state) => state.classes).filter(
    (clas) => clas.maxSeats > clas.students.length
  );

  const handleAssign = async (classId: number) => {
    const response = await assignToClass(studentId, classId);

    if (response.error) toast.error(response.error);
    else toast.info(`student ${response.id} was assigned to ${classId}`);
  };

  return (
    <Box>
      <Card style={styles.classes}>
        <CardHeader title="Avialable Classes"></CardHeader>
        <CardContent>
          {classes.map((clas) => (
            <Box key={clas.classId} style={styles.clas}>
              <SchoolIcon color="disabled" />
              <Box style={styles.name}>
                <Typography>{clas.name}</Typography>
              </Box>
              <IconButton onClick={() => handleAssign(clas.classId)}>
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
