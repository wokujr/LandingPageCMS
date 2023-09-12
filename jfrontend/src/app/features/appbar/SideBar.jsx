import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Dashboard from "../dashboard/Dashboard";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from "react-router-dom";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null);

    // COMPANY
    const navigate = useNavigate()
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {

        setAnchorEl(null);
    };

    // USER
    const openUser = Boolean(anchorElUser);
    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    };
    const handleClickUser = (e) =>{
        setAnchorElUser(e.currentTarget);
    };
    const handleCloseUser = () => {
        setAnchorElUser(null);
    };
    function handleLogout(event) {
        event?.preventDefault()
        handleCloseUserMenu()
        navigate("/logout")
    }

    //

    const drawer = (
        <div>
            <Toolbar />
            <Divider />

            {/*Company*/}
            <Button id="company" aria-controls={open ? 'company' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                Company
            </Button>
            <Menu id="company" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{'aria-labelledby': 'company',}} >
                <MenuItem onClick={handleClose}>Company Profile</MenuItem>
                <MenuItem onClick={handleClose}>New Profile</MenuItem>
            </Menu>

            <Divider />

            {/*User*/}
            <Button id="user" aria-controls={openUser ? 'user' : undefined} aria-haspopup="true" aria-expanded={openUser ? 'true' : undefined} onClick={handleClickUser}>
                User
            </Button>
            <Menu id="user" anchorEl={anchorElUser} open={openUser} onClose={handleCloseUser} MenuListProps={{'aria-labelledby': 'user',}}>
                <MenuItem onClick={handleClose}>Login</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>


        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` },}}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Responsive drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                <Toolbar />
                <Typography paragraph>
                   <Dashboard />
                </Typography>
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;