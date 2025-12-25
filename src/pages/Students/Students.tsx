import { toast } from "react-toastify";
import classroomApi from "../../api/api";
import { useStyles } from "./Student.style";
import { IStudent } from "./Students.types";
import React, { useCallback, useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import ClassesDialog from "../../components/ClassesDialog/ClassesDialog";
import {
  IStudenActionColumn,
  IStudentDataColumn,
  studentTableData,
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

    queryClient.invalidateQueries({ queryKey: ["students"] });
  };

  const { data } = useQuery({
    queryKey: ["students"],
    queryFn: classroomApi.getStudents,
  });

  const handleClose = () => {
    setAssignStudent(null);
    queryClient.invalidateQueries({ queryKey: ["students"] });
  };

  const students: IStudent[] = data;

  const assignCellRender = useCallback((row: IStudent) => (
    <TableCell key={`${row.id}-assign`} align="center">
      <Button
        variant="outlined"
        disabled={row.classId ? true : false}
        onClick={() => setAssignStudent(row)}
      >
        Assign to class
      </Button>
    </TableCell>
  ), []);

  const deleteCellRender = useCallback((row: IStudent) => (
    <TableCell key={`${row.id}-delete`} align="center">
      <Button
        variant="outlined"
        disabled={row.classId ? true : false}
        onClick={() => handleDelete(row.id)}
      >
        delete
      </Button>
    </TableCell>
  ), []);

  const studentTable: (IStudentDataColumn | IStudenActionColumn)[] = [
    ...studentTableData,
    {
      kind: "action",
      title: "Assign",
      key: "assign",
      cellRender: assignCellRender,
    },
    {
      kind: "action",
      title: "Delete",
      key: "delete",
      cellRender: deleteCellRender,
    },
  ];

  return (
    <Paper style={styles.students}>
      <Table>
        <TableHead style={styles.header}>
          <TableRow>
            {studentTable.map((column) => (
              <TableCell key={column.key} align="center">
                {column.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {students?.length &&
            students?.map((student) => (
              <TableRow key={student.id}>
                {studentTable.map((column) =>
                  column.kind === "data" ? (
                    <TableCell
                      key={`${student.id}-${column.key}`}
                      align="center"
                    >
                      {student[column.key]}
                    </TableCell>
                  ) : (
                    column.cellRender(student)
                  )
                )}
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
