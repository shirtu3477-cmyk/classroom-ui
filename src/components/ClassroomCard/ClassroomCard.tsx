import React, { useState } from "react";
import { toast } from "react-toastify";
import { deleteClass } from "../../api/api";
import { useStyles } from "./ClassroomCard.style";
import DeleteIcon from "@mui/icons-material/Delete";
import StudentsDialog from "../StudentsDialog/StudentsDialog";
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
import { IStudent } from "../../pages/Students/Students.types";

interface IClassroomCardProps {
  id: number;
  className: string;
  maxSeats: number;
  students: IStudent[];
  updateClassesStore: (id:number) => void
}

const ClassroomCard: React.FC<IClassroomCardProps> = ({
  id,
  className,
  maxSeats,
  students,
  updateClassesStore
}) => {
  const styles = useStyles();
  const [sdialog, setSDialog] = useState<boolean>(false)
  const handleDelete = async (id: number) => {
    const response = await deleteClass(id);
    if(response) {
        toast.error(response.error)
    }

    updateClassesStore(id)
  };

  return (
    <>
    <Card style={styles.card}>
      <CardHeader title={<Typography variant="h4">{className}</Typography>} />
      <CardContent style={styles.content}>
        <Typography variant="subtitle1">{`there are ${
          maxSeats - students.length
        } seats left`}</Typography>
        <Typography
          color="gray"
          variant="body2"
        >{`out of ${maxSeats}`}</Typography>
      </CardContent>
      <CardActions>
        <Button style={styles.btn} variant="text" onClick={() => setSDialog(true)}>
          STUDENTS LIST
        </Button>
        <IconButton onClick={() => handleDelete(id)} color="primary">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
    <Dialog open={sdialog} onClose={() => setSDialog(false)}>
        <StudentsDialog students={students} />
    </Dialog>
    </>
  );
};

export default ClassroomCard;
