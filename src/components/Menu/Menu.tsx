import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./Menu.style";
import { MenuItem, Box, Drawer } from "@mui/material";

interface IMenuProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Menu: React.FC<IMenuProps> = ({ open, setOpen }) => {
    const styles = useStyles()

    return <Drawer open={open} onClose={() => setOpen(!open)} >
        <Box style={styles.menu}>
            <MenuItem>
                <Link style={styles.link} to="/" onClick={() => setOpen(false)}>Classes</Link>
            </MenuItem>
            <MenuItem>
                <Link style={styles.link} to="/students" onClick={() => setOpen(false)}>Students</Link>
            </MenuItem>
            <MenuItem>
                <Link style={styles.link} to="/create" onClick={() => setOpen(false)}>Create</Link>
            </MenuItem></Box>
    </Drawer>
}

export default Menu