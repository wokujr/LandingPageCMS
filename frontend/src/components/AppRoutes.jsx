import { Route, Routes } from "react-router-dom";

import CompanyList from "../features/company/CompanyList"
import CompanyAbout from "../features/company/CompanyAbout";
import CompanyNew from "../features/company/CompanyNew";
import EditProfile from "../features/company/EditProfile";
import CompanyDetail from "../features/company/CompanyDetail";


function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<CompanyAbout />} />
            <Route path="/company" element={<CompanyList />} />
            <Route path="/company/new" element={<CompanyNew />} />
            <Route path="/company/:id" element={<CompanyDetail />} />
            <Route path="/company/:id/edit" element={<EditProfile />} />
        </Routes>
    );
}

export default AppRoutes;