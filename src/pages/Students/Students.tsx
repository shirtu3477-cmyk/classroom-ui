import {
  IStudenActionColumn,
  IStudent,
  IStudentDataColumn,
} from "./Students.types";
import {
  Dialog,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import React, { useState } from "react";
import classroomApi from "../../api/api";
import { useStyles } from "./Student.style";
import { studentTableData } from "../../consts/studentsTable";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import ClassesDialog from "../../components/ClassesDialog/ClassesDialog";
import ActionTableCell from "../../components/ActionTableCell/ActionTableCell";

const Students: React.FC = () => {
  const styles = useStyles();
  const [assignStudent, setAssignStudent] = useState<IStudent | null>(null);
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    try {
      await classroomApi.deleteStudent(id);
      queryClient.invalidateQueries({ queryKey: ["students"] });
    } catch (e) {
      if (isAxiosError(e)) toast.error(e.message);
    }
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

  const setStudentForAssign = (id: string) => {
    const student = students.find((student) => student.id === id);

    if (student) setAssignStudent(student);
  };

  const studentTable: (IStudentDataColumn | IStudenActionColumn)[] = [
    ...studentTableData,
    {
      kind: "action",
      title: "Assign",
      key: "assign",
      action: setStudentForAssign,
    },
    {
      kind: "action",
      title: "Delete",
      key: "delete",
      action: handleDelete,
    },
  ];

  return (
    <Paper style={styles.students}>
      <Table>
        <TableHead style={styles.header}>
          <TableRow>
            {studentTable.map(({ key, title }) => (
              <TableCell key={key} align="center">
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {students?.length &&
            students?.map((student) => (
              <TableRow key={student.id}>
                {studentTable.map((column) =>
                  "action" in column ? (
                    <ActionTableCell
                      key={`${student.id}-${column.key}`}
                      text={column.title}
                      id={student.id}
                      classId={student.classId}
                      action={column.action}
                    />
                  ) : (
                    <TableCell
                      key={`${student.id}-${column.key}`}
                      align="center"
                    >
                      {student[column.key]}
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Dialog open={!!assignStudent} onClose={() => setAssignStudent(null)}>
        <ClassesDialog student={assignStudent} handleClose={handleClose} />
      </Dialog>
    </Paper>
  );
};

export default Students;
