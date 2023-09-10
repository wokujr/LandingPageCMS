import {Route, Routes } from "react-router-dom";

import CompanyList from "../features/company/CompanyList"
import CompanyAbout from "../features/company/CompanyAbout";
import CompanyNew from "../features/company/CompanyNew";
import EditProfile from "../features/company/EditProfile";
import CompanyDetail from "../features/company/CompanyDetail";

// Self Add
import Login from "./session/Login"; //for now using Login2
import Login2 from "./session/Login2";
import PersisLogin from "./session/PersisLogin";
import PrivateRoute from "./routes/PrivateRoutes";
import Dashboard from "./dashboard/Dashboard";
import Logout from "./session/Logout";
import SignUp from "./session/SignUp";
import PublicOnlyRoute from "./routes/PublicOnlyRoute";





function AppRoutes() {
    return (
        <Routes>
            <Route element={<PersisLogin/>}>
                <Route path="/" element={
                    <PrivateRoute>
                        <Dashboard/>
                    </PrivateRoute>}>
                </Route>

                {/*LogOut*/}
                <Route path="/logout" element={
                    <PrivateRoute>
                        <Logout/>
                    </PrivateRoute>}>
                </Route>

                {/*LogIn*/}
                <Route path="/login" element={
                    <PublicOnlyRoute>
                        <Login2/>
                    </PublicOnlyRoute>}>
                </Route>

                {/*SignUp*/}
                <Route path="/signup" element={
                    <PublicOnlyRoute>
                        <SignUp/>
                    </PublicOnlyRoute>}>
                </Route>
            </Route>


            <Route path="/about" element={<CompanyAbout />} />
            <Route path="/company" element={<CompanyList />} />
            <Route path="/company/new" element={<CompanyNew />} />
            <Route path="/company/:id" element={<CompanyDetail />} />
            <Route path="/company/:id/edit" element={<EditProfile />} />
            {/*<Route path="/login" element={<Login2 />} />*/}
        </Routes>
    );
}

export default AppRoutes;