import { Route, Routes } from "react-router-dom";

import CompanyList from "../features/company/CompanyList"
import CompanyAbout from "../features/company/CompanyAbout";
import CompanyNew from "../features/company/CompanyNew";
import EditProfile from "../features/company/EditProfile";
import CompanyDetail from "../features/company/CompanyDetail";

import Login from "./sessions/Login";

import TeamList from "../features/team/TeamList";
import NewTeams from "../features/team/NewTeam";
import EditTeam from "../features/team/EditTeam"


function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<CompanyAbout />} />
            <Route path="/company" element={<CompanyList />} />
            <Route path="/company/new" element={<CompanyNew />} />
            <Route path="/company/:id" element={<CompanyDetail />} />
            <Route path="/company/:id/edit" element={<EditProfile />} />
            <Route path="/login" element={<Login />} />

            <Route path="/teams" element={<TeamList />}> </Route>
            <Route path="/teams/add" element={<NewTeams />}></Route>
            <Route path="/teams/:id/edit" element={<EditTeam />} />


        </Routes>
    );
}

export default AppRoutes;