import Create from "./pages/Create/Create";
import { createTheme } from "@mui/material";
import Classes from "./pages/Classes/Classes";
import Navbar from "./components/Navbar/Navbar";
import Students from "./pages/Students/Students";
import React, { useMemo, useState } from "react";
import { ColorMode, Colors } from "./styles/theme";
import { PaletteMode, ThemeProvider } from "@mui/material";
import { HashRouter, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  const [mode, setMode] = useState<PaletteMode>(ColorMode.LIGHT);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === ColorMode.LIGHT ? ColorMode.DARK : ColorMode.LIGHT));
      },
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
       palette: {primary: {main: mode === ColorMode.LIGHT ? Colors.LIGHT : Colors.DARK}}
      }),
    [mode]
  );
  
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
          <Navbar colorMode={colorMode} />
          <Routes>
            <Route path="/classes" element={<Classes />} />
            <Route path="/students" element={<Students />} />
            <Route path="create" element={<Create />} />
          </Routes>
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;
