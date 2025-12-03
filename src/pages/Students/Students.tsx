import { useStyles } from "./Student.style";
import { deleteStudent, getStudents } from "../../api/api";
import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { IStudent } from "./Students.types";

const Students: React.FC = () => {
  const styles = useStyles();
  const [students, setStudents] = useState<IStudent[]>([]);
  const fetchClasses = async () => {
    const response = await getStudents();
    setStudents(response);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteStudent(id);
    setStudents(students.filter((student) => student.id !== id));
  };

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
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell align="center">{student.id}</TableCell>
              <TableCell align="center">{student.firstName}</TableCell>
              <TableCell align="center">{student.lastName}</TableCell>
              <TableCell align="center">{student.age}</TableCell>
              <TableCell align="center">{student.profession}</TableCell>
              <TableCell align="center">
                <Button variant="outlined">Assign to class</Button>
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  onClick={() => handleDelete(student.id)}
                >
                  delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Students;
