import React from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useStyles } from "./Classes.style";
import { IClass, setClasses } from "../../redux/slices/classes";
import { useClassesSelector } from "../../redux/selectors/classes";
import ClassroomCard from "../../components/ClassroomCard/ClassroomCard";

const Classes: React.FC = () => {
  const styles = useStyles();
  const classes = useClassesSelector((state) => state.classes);
  const dispatch = useDispatch();

  const updateClassesStore = (id: number) => {
    dispatch(setClasses(classes.filter((clas) => clas.classId !== id)));
  };

  return (
    <Box style={styles.classes}>
      {classes?.map((clas: IClass) => (
        <ClassroomCard
          updateClassesStore={updateClassesStore}
          key={clas.classId}
          id={clas.classId}
        />
      ))}
    </Box>
  );
};

export default Classes;
