import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import React from "react";
import {Link} from "react-router-dom";

function NavBar() {
    return(
        <Sidebar>
            <Menu>
                <SubMenu label="Charts">

                    <MenuItem component={<Link to={"/"} /> }> About </MenuItem>
                    <MenuItem component={<Link to={"/company"} /> }> List Profile </MenuItem>
                    <MenuItem component={<Link to={"/company/new"} /> }> Add new Profile </MenuItem>
                </SubMenu>
                <MenuItem> Documentation </MenuItem>
                <MenuItem> Calendar </MenuItem>
            </Menu>
        </Sidebar>
    )
}

export default NavBar