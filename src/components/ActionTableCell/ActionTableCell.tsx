import React from "react";
import { Button, TableCell } from "@mui/material";

interface IActionTableCellProps {
    id: string,
    classId: number,
    text: string
    action: (id:string) => void
}

const ActionTableCell: React.FC<IActionTableCellProps> = ({id, classId, text, action}) => {
  return (
    <TableCell key={`${id}-delete`} align="center">
      <Button
        variant="outlined"
        disabled={!!classId}
        onClick={() => action(id)}
      >
        {text}
      </Button>
    </TableCell>
  );
};

export default ActionTableCell;