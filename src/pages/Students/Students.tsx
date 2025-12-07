import React, { useState } from "react";
import { useStyles } from "./Student.style";
import { IStudent } from "./Students.types";
import { deleteStudent, getStudents } from "../../api/api";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import ClassesDialog from "../../components/ClassesDialog/ClassesDialog";
import {
  Button,
  Dialog,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { toast } from "react-toastify";

const Students: React.FC = () => {
  const styles = useStyles();
  const [assignStudent, setAssignStudent] = useState<IStudent | null>(null);
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    const response = await deleteStudent(id );

    if(response) {
      toast.error(response.error)
      return;
    }

    queryClient.invalidateQueries({ queryKey: [`students`] });
  };

  const response = useQuery({
    queryKey: [`students`],
    queryFn: getStudents,
  });

  const handleClose = () => {
    setAssignStudent(null);
    queryClient.invalidateQueries({ queryKey: [`students`] });
  };

  const students: IStudent[] = response.data;
  return (
    <Paper style={styles.students}>
      <Table>
        <TableHead style={styles.header}>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">Profession</TableCell>
            <TableCell align="center">Assign</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students?.map((student) => (
            <TableRow key={student.id}>
              <TableCell align="center">{student.id}</TableCell>
              <TableCell align="center">{student.firstName}</TableCell>
              <TableCell align="center">{student.lastName}</TableCell>
              <TableCell align="center">{student.age}</TableCell>
              <TableCell align="center">{student.profession}</TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  disabled={student.classId ? true : false}
                  onClick={() => setAssignStudent(student)}
                >
                  Assign to class
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  disabled={student.classId ? true : false}
                  onClick={() => handleDelete(student.id)}
                >
                  delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={assignStudent ? true : false}
        onClose={() => setAssignStudent(null)}
      >
        <ClassesDialog student={assignStudent} handleClose={handleClose} />
      </Dialog>
    </Paper>
  );
};

export default Students;
