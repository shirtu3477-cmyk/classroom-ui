import { ROUTES } from "./consts/routes";
import { createTheme } from "@mui/material";
import {ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar";
import React, { useMemo, useState } from "react";
import { ColorMode, COLORS } from "./consts/theme";
import { PaletteMode, ThemeProvider } from "@mui/material";
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

  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Navbar colorMode={colorMode} />
        <Routes>
          {ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element}></Route>
          ))}
        </Routes>
        <ToastContainer />
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;
