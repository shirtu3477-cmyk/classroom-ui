import Menu from "../Menu/Menu";
import React, { useState } from "react";
import { useStyles } from "./Navbar.style";
import MenuIcon from "@mui/icons-material/Menu";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";

interface INavbarProps {
    colorMode: { toggleColorMode: () => void; }
}

const Navbar: React.FC<INavbarProps> = ({colorMode}) => {
  const styles = useStyles();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
 
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => setMenuOpen(!menuOpen)}
            style={styles.menuButton}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Typography variant="h4" color="inherit" style={styles.item}>
            Shob Classes
          </Typography>
          <IconButton color="inherit" onClick={colorMode.toggleColorMode} style={styles.item}>
            <LoyaltyIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu open={menuOpen} setOpen={setMenuOpen} />
    </Box>
  );
};

export default Navbar;
