import classroomApi from "./api/api";
import { useDispatch } from "react-redux";
import Create from "./pages/Create/Create";
import { createTheme } from "@mui/material";
import Classes from "./pages/Classes/Classes";
import Navbar from "./components/Navbar/Navbar";
import { toast, ToastContainer } from "react-toastify";
import Students from "./pages/Students/Students";
import { ColorMode, COLORS } from "./consts/theme";
import { setClasses } from "./redux/slices/classes";
import { PaletteMode, ThemeProvider } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  const [mode, setMode] = useState<PaletteMode>(ColorMode.LIGHT);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) =>
          prevMode === ColorMode.LIGHT ? ColorMode.DARK : ColorMode.LIGHT
        );
      },
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: mode === ColorMode.LIGHT ? COLORS.light : COLORS.dark,
          },
        },
      }),
    [mode]
  );

  const dispatch = useDispatch();

  const fetchClasses = async () => {
    const classes = await classroomApi.getClasses();

    if (classes.error) toast.error('classroom server is offline :(') 
    else dispatch(setClasses(classes));
  };

  useEffect(() => {
    fetchClasses();
  }, []);
  
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Navbar colorMode={colorMode} />
        <Routes>
          <Route path="/" element={<Classes />} />
          <Route path="/students" element={<Students />} />
          <Route path="create" element={<Create />} />
        </Routes>
        <ToastContainer />
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;
