import { toast } from "react-toastify";
import React, { useState } from "react";
import classroomApi from "../../api/api";
import { useStyles } from "./Student.style";
import { IStudent } from "./Students.types";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import ClassesDialog from "../../components/ClassesDialog/ClassesDialog";
import {
  STUDENTS_DETAILS_COLUMNS,
  STUDENTS_ACTIONS_COLUMNS,
} from "../../consts/studentsTable";
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

const Students: React.FC = () => {
  const styles = useStyles();
  const [assignStudent, setAssignStudent] = useState<IStudent | null>(null);
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    const response = await classroomApi.deleteStudent(id);

    if (response) {
      toast.error(response.error);
      return;
    }

    queryClient.invalidateQueries({ queryKey: ['students'] });
  };

  const { data } = useQuery({
    queryKey: ['students'],
    queryFn: classroomApi.getStudents,
  });

  const handleClose = () => {
    setAssignStudent(null);
    queryClient.invalidateQueries({ queryKey: ['students'] });
  };

  const students: IStudent[] = data;
  const fullTable = STUDENTS_DETAILS_COLUMNS.concat(STUDENTS_ACTIONS_COLUMNS);
  return (
    <Paper style={styles.students}>
      <Table>
        <TableHead style={styles.header}>
          <TableRow>
            {fullTable.map((column) => (
              <TableCell key={column.key} align="center">
                {column.title}
              </TableCell>
            ))}
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
