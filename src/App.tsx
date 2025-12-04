import Create from "./pages/Create/Create";
import { createTheme } from "@mui/material";
import Classes from "./pages/Classes/Classes";
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer } from 'react-toastify';
import Students from "./pages/Students/Students";
import React, { useEffect, useMemo, useState } from "react";
import { ColorMode, Colors } from "./styles/theme";
import { PaletteMode, ThemeProvider } from "@mui/material";
import { HashRouter, Route, Routes } from "react-router-dom";
import { getClasses } from "./api/api";
import { setClasses } from "./redux/slices/classes";
import { useDispatch } from "react-redux";
<svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="#F50057"/>
</svg>


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
            main: mode === ColorMode.LIGHT ? Colors.LIGHT : Colors.DARK,
          },
        },
      }),
    [mode]
  );

  const dispatch = useDispatch()

  const fetchClasses = async () => {
    const classes = await getClasses();
    dispatch(setClasses(classes));
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
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

