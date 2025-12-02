import React from "react";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { getClasses } from "../../api/api";
import { useStyles } from "./Classes.style";
import { IClass, setClasses } from "../../redux/slices/classes";
import { useClassesSelector } from "../../redux/selectors/classes";
import ClassroomCard from "../../components/ClassroomCard/ClassroomCard";

const Classes: React.FC = () => {
  const styles = useStyles();
  const classes = useClassesSelector((state) => state.classes);
  const dispatch = useDispatch();

  const fetchClasses = async () => {
    const classes = await getClasses();
    dispatch(setClasses(classes));
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const updateClassesStore = (id: number) => {
    const classesUpdated = classes.filter((clas) => clas.classId !== id);
    dispatch(setClasses(classesUpdated));
  };

  return (
    <Box style={styles.classes}>
      {classes?.map((clas: IClass) => (
        <ClassroomCard
          updateClassesStore={updateClassesStore}
          key={clas.classId}
          id={clas.classId}
          className={clas.name}
          maxSeats={clas.maxSeats}
          takenSeats={0}
        />
      ))}
    </Box>
  );
};

export default Classes;
