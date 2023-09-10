import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import React from "react";
import {Link} from "react-router-dom";

function NavBar() {
    return(
        <Sidebar className="bg-dark">
            <Menu>
                <SubMenu label="About">
                    <MenuItem component={<Link to={"/"} /> }> About </MenuItem>
                    <MenuItem component={<Link to={"/company"} /> }> List Profile </MenuItem>
                    <MenuItem component={<Link to={"/company/new"} /> }> Add new Profile </MenuItem>
                    <MenuItem> Teams </MenuItem>
                    <MenuItem> Galeri </MenuItem>
                    <MenuItem> Contact </MenuItem>
                    <MenuItem> SocialMedia</MenuItem>
                </SubMenu>
                <SubMenu label="User">
                    <MenuItem component={<Link to={"/login"} /> }> Log In </MenuItem>
                    <MenuItem component={<Link to={"/login"} /> }> Log Out </MenuItem>
                    <MenuItem component={<Link to={"/login"} /> }> Sign Up</MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    )
}

export default NavBar