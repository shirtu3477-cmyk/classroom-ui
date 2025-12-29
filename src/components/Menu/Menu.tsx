import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./Menu.style";
import { items } from "../../consts/menuItems";
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
        {items.map((item) => (
          <MenuItem key={item.title}>
            <Link
              style={styles.link}
              to={item.path}
              onClick={() => setOpen(false)}
            >
              {item.title}
            </Link>
          </MenuItem>
        ))}
      </Box>
    </Drawer>
  );
};

export default Menu;
