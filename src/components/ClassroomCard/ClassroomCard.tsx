import React from "react";
import { deleteClass } from "../../api/api";
import { useStyles } from "./ClassroomCard.style";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

interface IClassroomCardProps {
  id: number;
  className: string;
  maxSeats: number;
  takenSeats: number;
  updateClassesStore: (id:number) => void
}

const ClassroomCard: React.FC<IClassroomCardProps> = ({
  id,
  className,
  maxSeats,
  takenSeats,
  updateClassesStore
}) => {
  const styles = useStyles();
  ;
  const handleDelete = async (id: number) => {
    const response = await deleteClass(id);
    if(response) {
        toast.error(response.error)
    }

    updateClassesStore(id)
  };

  const showStudentsList = () => {};
  return (
    <Card style={styles.card}>
      <CardHeader title={<Typography variant="h4">{className}</Typography>} />
      <CardContent style={styles.content}>
        <Typography variant="subtitle1">{`there are ${
          maxSeats - takenSeats
        } seats left`}</Typography>
        <Typography
          color="gray"
          variant="body2"
        >{`out of ${maxSeats}`}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="text" onClick={showStudentsList}>
          STUDENTS LIST
        </Button>
        <IconButton onClick={() => handleDelete(id)} color="primary">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ClassroomCard;
