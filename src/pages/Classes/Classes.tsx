import { Box } from "@mui/material";
import { toast } from "react-toastify";
import React, { useEffect } from "react";
import classroomApi from "../../api/api";
import { useDispatch } from "react-redux";
import { useStyles } from "./Classes.style";
import { useClassesSelector } from "../../redux/selectors/classes";
import ClassroomCard from "../../components/ClassroomCard/ClassroomCard";
import { addClass, IClass, removeClass, setClasses } from "../../redux/slices/classes";

const Classes: React.FC = () => {
  const styles = useStyles();
  const classes = useClassesSelector((state) => state.classes);
  const dispatch = useDispatch();

  const removeClassFromStore = (id: number) => {
    dispatch(removeClass(id));
  };

  const addClassToStore = (classObj: IClass) => {
    dispatch(addClass(classObj))
  }

  const fetchClasses = async () => {
    try {
      const classes = await classroomApi.getClasses();
      dispatch(setClasses(classes));
    } catch (e) {
      toast.error("classroom server is offline :(");
    }
  };

  useEffect(() => {
    if (classes.length === 0) fetchClasses();
  }, []);

  return (
    <Box style={styles.classes}>
      {classes.length ? (
        classes.map(({ classId }) => (
          <ClassroomCard
            removeClassFromStore={removeClassFromStore}
            addClassToStore={addClassToStore}
            key={classId}
            id={classId}
          />
        ))
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Classes;
