import React from "react";
import { Box, Card } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getClasses } from "../../api/api";
import { useStyles } from "./Classes.style";

const Classes: React.FC = () => {
  const styles = useStyles()
  const response = useQuery({
    queryKey: [`classes`],
    queryFn: getClasses,
  }); 

  const classes = response.data;
  return (
    <Box style={styles.classes}>
      {classes?.map(
        (clas: { classId: number; name: string; maxSeats: number }) => (
          <Card key={clas.classId}>{clas.name}</Card>
        )
      )}
    </Box>
  );
};

export default Classes;
