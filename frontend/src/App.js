import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap"
import NavBar from "./components/NavBar"
import AppRoutes from "./components/AppRoutes";
import {BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
      <Router>
          <div className="App">
              <div className="container"></div>
              <div className="row">
                  <div className="col-4">
                      <NavBar />
                  </div>
                  <div className="col-6">
                      <AppRoutes />
                  </div>
              </div>


          </div>
      </Router>
  );
}

export default App;
