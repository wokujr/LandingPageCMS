import {Route, Routes } from "react-router-dom";

import CompanyList from "../features/company/CompanyList"
import CompanyAbout from "../features/company/CompanyAbout";
import CompanyNew from "../features/company/CompanyNew";
import EditProfile from "../features/company/EditProfile";
import CompanyDetail from "../features/company/CompanyDetail";

// hmmm
import Login from "./session/Login";
import PersisLogin from "./session/PersisLogin";
import PrivateRoute from "./routes/PrivateRoutes";
import Dashboard from "./dashboard/Dashboard";





function AppRoutes() {
    return (
        <Routes>
            <Route element={<PersisLogin />}>
                <Route path="/" element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute> } >
                </Route>
            </Route>
            <Route path="/about" element={<CompanyAbout />} />
            <Route path="/company" element={<CompanyList />} />
            <Route path="/company/new" element={<CompanyNew />} />
            <Route path="/company/:id" element={<CompanyDetail />} />
            <Route path="/company/:id/edit" element={<EditProfile />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default AppRoutes;