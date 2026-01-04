import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import React, { useState } from "react";
import classroomApi from "../../api/api";
import TrashIcon from "../../icons/TrashIcon";
import { useStyles } from "./ClassroomCard.style";
import { IClass } from "../../redux/slices/classes";
import { selectClassById } from "../../redux/slices/classes";
import StudentsDialog from "../StudentsDialog/StudentsDialog";
import { useClassesSelector } from "../../redux/selectors/classes";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  IconButton,
  Typography,
} from "@mui/material";

interface IClassroomCardProps {
  id: number;
  removeClassFromStore: (id: number) => void;
  addClassToStore: (classObj: IClass) => void;
}

const ClassroomCard: React.FC<IClassroomCardProps> = ({
  id,
  removeClassFromStore,
  addClassToStore,
}) => {
  const styles = useStyles();
  const [sdialog, setSDialog] = useState<boolean>(false);
  const classObj = useClassesSelector((state) => selectClassById(state, id));

  const handleDelete = async (id: number) => {
    if (classObj?.students.length !== 0) {
      toast.error(
        "class cannot be deleted because students are assigned to it"
      );

      return;
    }

    try {
      removeClassFromStore(id);
      await classroomApi.deleteClass(id);
    } catch (e) {
      if (isAxiosError(e)) toast.error(e.message);
      addClassToStore(classObj);
    }
  };

  const handleClose = () => setSDialog(false);

  return (
    <>
      {classObj && (
        <>
          <Card style={styles.card}>
            <CardHeader
              title={
                <Typography style={styles.header} variant="h5">
                  {classObj.name}
                </Typography>
              }
            />
            <CardContent style={styles.content}>
              <Typography variant="subtitle1">
                there are
                <span style={styles.seats}>
                  {classObj.maxSeats - classObj.students.length}
                </span>
                seats left
              </Typography>
              <Typography style={styles.seatsDeatils} variant="body2">
                out of <span style={styles.seats}>{classObj.maxSeats}</span>
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                style={styles.btn}
                variant="text"
                onClick={() => setSDialog(true)}
              >
                STUDENTS LIST
              </Button>
              <IconButton onClick={() => handleDelete(id)} color="primary">
                <TrashIcon />
              </IconButton>
            </CardActions>
          </Card>
          <Dialog open={sdialog} onClose={handleClose}>
            <StudentsDialog students={classObj.students} />
          </Dialog>
        </>
      )}
    </>
  );
};

export default ClassroomCard;
