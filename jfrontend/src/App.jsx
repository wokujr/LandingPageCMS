import React from "react";
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom"
import "./App.css"

import PersistLogin from "./app/features/sessions/PersistLogin";
import PrivateRoute from "./app/features/routes/PrivateRoute";
import Dashboard from "./app/features/dashboard/Dashboard";
import Logout from "./app/features/sessions/Logout";
import UpdateProfile from "./app/features/sessions/UpdateProfile";
import PublicOnlyRoute from "./app/features/routes/PublicOnlyRoute";
import Login from "./app/features/sessions/Login";
import Signup from "./app/features/sessions/Signup";
import CompanyAbout from "./app/features/company/CompanyAbout";
import CompanyList from "./app/features/company/CompanyList";
import CompanyNew from "./app/features/company/CompanyNew";
import CompanyDetail from "./app/features/company/CompanyDetail";
import EditProfile from "./app/features/company/EditProfile";
import TeamList from "./app/features/company/teams/TeamList";
import NewTeams from "./app/features/company/teams/NewTeam";
import Gallery from "./app/features/company/galleries/Gallery";
import NewGallery from "./app/features/company/galleries/NewGallery";
import ShowGallery from "./app/features/company/galleries/ShowGallery";
import NewImage from "./app/features/company/galleries/NewImage";

import SideBar from "./app/features/appbar/SideBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Contact from "./app/features/company/contact/Contact";

const drawerWidth = 240;

function App() {
    return (
        <div className="App">
            <Router>
                <div className="row">
                    <div className="col-2">
                        <Box component="nav" sx={{display: 'flex', width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
                             aria-label="mailbox folders">
                            <SideBar/>
                        </Box>
                    </div>
                    <div className="col">
                        <Box component="main" sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}>
                            <Toolbar/>
                            <Routes>
                                <Route element={<PersistLogin/>}>
                                    <Route path="/" element={
                                        <PrivateRoute>
                                            <Dashboard/>
                                        </PrivateRoute>
                                    }
                                    />
                                    <Route path="/logout" element={
                                        <PrivateRoute>
                                            <Logout/>
                                        </PrivateRoute>
                                    }
                                    />
                                    <Route path="/update-profile" element={
                                        <PrivateRoute>
                                            <UpdateProfile/>
                                        </PrivateRoute>
                                    }
                                    />
                                    <Route path="/login" element={
                                        <PublicOnlyRoute>
                                            <Login/>
                                        </PublicOnlyRoute>
                                    }
                                    />
                                    <Route path="/signup" element={
                                        <PublicOnlyRoute>
                                            <Signup/>
                                        </PublicOnlyRoute>
                                    }
                                    />

                                    {/*Company Route*/}
                                    <Route path="/company" element={
                                        <PrivateRoute>
                                            <CompanyAbout/>
                                        </PrivateRoute>
                                    }/>
                                    <Route path="/company/list" element={
                                        <PrivateRoute>
                                            <CompanyList/>
                                        </PrivateRoute>
                                    }/>
                                    <Route path="/company/new" element={
                                        <PrivateRoute>
                                            <CompanyNew/>
                                        </PrivateRoute>
                                    }/>
                                    <Route path="/company/:id" element={
                                        <PrivateRoute>
                                            <CompanyDetail/>
                                        </PrivateRoute>
                                    }/>
                                    <Route path="/company/:id/edit" element={
                                        <PrivateRoute>
                                            <EditProfile/>
                                        </PrivateRoute>
                                    }/>

                                    {/*Teams*/}
                                    <Route path="/teams" element={
                                        <PrivateRoute>
                                            <TeamList/>
                                        </PrivateRoute>
                                    }/>
                                    <Route path="/team/new" element={
                                        <PrivateRoute>
                                            <NewTeams/>
                                        </PrivateRoute>
                                    }/>

                                    {/*Gallery*/}
                                    <Route path="/galleries" element={
                                        <PrivateRoute>
                                            <Gallery/>
                                        </PrivateRoute>
                                    }/>
                                    <Route path="/gallery/new" element={
                                        <PrivateRoute>
                                            <NewGallery/>
                                        </PrivateRoute>
                                    }/>
                                    <Route path="/gallery/:id" element={
                                        <PrivateRoute>
                                            <ShowGallery/>
                                        </PrivateRoute>
                                    }/>
                                    <Route path="/gallery/:id/edit" element={
                                        <PrivateRoute>
                                            <NewImage/>
                                        </PrivateRoute>
                                    }/>

                                    {/*CONTACT*/}
                                    <Route path="/contact" element={
                                        <PrivateRoute>
                                            <Contact/>
                                        </PrivateRoute>
                                    }/>

                                </Route>
                            </Routes>
                        </Box>
                    </div>
                </div>
            </Router>
        </div>
    )
}

export default App
