import React from "react";
import { BrowserRouter as Router,  } from "react-router-dom"
import "./App.css"

// Route, Routes
// import PrivateRoute from "./app/features/routes/PrivateRoute"
// import PublicOnlyRoute from "./app/features/routes/PublicOnlyRoute"
// import Login from "./app/features/sessions/Login"
// import Logout from "./app/features/sessions/Logout"
// import PersistLogin from "./app/features/sessions/PersistLogin"
// import Signup from "./app/features/sessions/Signup"
// import UpdateProfile from "./app/features/sessions/UpdateProfile"
//
// import CompanyAbout from "./app/features/company/CompanyAbout";
// import CompanyList from "./app/features/company/CompanyList";
// import CompanyNew from "./app/features/company/CompanyNew";
// import CompanyDetail from "./app/features/company/CompanyDetail";
// import EditProfile from "./app/features/company/EditProfile";

import SideBar from "./app/features/appbar/SideBar"
// import AppBar from "./app/features/appbar/AppBar"
// import Dashboard from "./app/features/dashboard/Dashboard"

function App() {
  return (
      <div className="App">
        <Router>

          {/*<header className="App-header">*/}
          {/* <SideBar /> */}
          {/*</header>*/}

            <div>
                <SideBar />
            </div>

          {/*<main>*/}
          {/*  <Routes>*/}
          {/*    <Route element={<PersistLogin />} >*/}
          {/*      <Route path="/" element={*/}
          {/*            <PrivateRoute>*/}
          {/*              /!*<Dashboard />*!/*/}

          {/*            </PrivateRoute>*/}
          {/*          }*/}
          {/*      />*/}
          {/*      <Route path="/logout" element={*/}
          {/*            <PrivateRoute>*/}
          {/*              <Logout />*/}
          {/*            </PrivateRoute>*/}
          {/*          }*/}
          {/*      />*/}
          {/*      <Route path="/update-profile" element={*/}
          {/*            <PrivateRoute>*/}
          {/*              <UpdateProfile />*/}
          {/*            </PrivateRoute>*/}
          {/*          }*/}
          {/*      />*/}
          {/*      <Route path="/login" element={*/}
          {/*            <PublicOnlyRoute>*/}
          {/*              <Login />*/}
          {/*            </PublicOnlyRoute>*/}
          {/*          }*/}
          {/*      />*/}
          {/*      <Route path="/signup" element={*/}
          {/*            <PublicOnlyRoute>*/}
          {/*              <Signup />*/}
          {/*            </PublicOnlyRoute>*/}
          {/*          }*/}
          {/*      />*/}
          {/*        /!*Company Route*!/*/}
          {/*        <Route path="/company" element={<CompanyAbout/>} />*/}
          {/*        <Route path="/company/list" element={<CompanyList />} />*/}
          {/*        <Route path="/company/new" element={<CompanyNew />} />*/}
          {/*        <Route path="/company/:id" element={<CompanyDetail />} />*/}
          {/*        <Route path="/company/:id/edit" element={<EditProfile />} />*/}


          {/*    </Route>*/}
          {/*  </Routes>*/}
          {/*</main>*/}
        </Router>
      </div>
  )
}

export default App
