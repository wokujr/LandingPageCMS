import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import React from "react";
import {Link} from "react-router-dom";
import Signout from "././sessions/SignOut";

function NavBar() {
    return(
        <Sidebar className="bg-dark">
            <Menu>
                <SubMenu label="About">
                    <SubMenu label="all about">
                        <MenuItem component={<Link to={"/"} /> }> About </MenuItem>
                        <MenuItem component={<Link to={"/company"} /> }> List Profile </MenuItem>
                        <MenuItem component={<Link to={"/company/new"} /> }> Add new Profile </MenuItem>
                    </SubMenu>
                    <SubMenu label="Team">
                        <div className="bg-dark text-white">
                            <MenuItem component={<Link to="/teams"/> } > Teams List </MenuItem>
                            <MenuItem component={<Link to="/teams/add"/> }> New Team </MenuItem>
                        </div>
                    </SubMenu>

                    <MenuItem> Galeri </MenuItem>
                    <MenuItem> Contact </MenuItem>
                    <MenuItem> SocialMedia</MenuItem>

                </SubMenu>
                <SubMenu label="User">
                    <MenuItem component={<Link to={"/login"} /> }> Log In </MenuItem>
                    <MenuItem>
                        <Signout />
                    </MenuItem>
                    <MenuItem component={<Link to={"/login"} /> }> Sign Up</MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    )
}

export default NavBar