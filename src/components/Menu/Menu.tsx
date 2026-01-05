import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./Menu.style";
import { ROUTES } from "../../consts/routes";
import { MenuItem, Box, Drawer } from "@mui/material";

interface IMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<IMenuProps> = ({ open, setOpen }) => {
  const styles = useStyles();

  return (
    <Drawer open={open} onClose={() => setOpen(!open)}>
      <Box style={styles.menu}>
        {ROUTES.map(({ path, label }) => (
          <MenuItem key={label}>
            <Link style={styles.link} to={path} onClick={() => setOpen(false)}>
              {label}
            </Link>
          </MenuItem>
        ))}
      </Box>
    </Drawer>
  );
};

export default Menu;
