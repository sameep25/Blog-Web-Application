import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import DataProvider from "./context/DataProvider";

// PAGES
import Home from "./Pages/Home";
import CreateBlog from "./Pages/CreateBlog";
import DetailView from "./Pages/DetailView";
// COMPONENTS
import Login from "./Pages/Login";
import Header from "./components/Home/Header";

// private routes to prevent direct routing
const PrivateRoute = ({isUserAuthenticated, ...props}) => {
  return isUserAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {

  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <Router>
        <div>
          <Routes>
            <Route
              path="/login"
              element={
                <Login setIsUserAuthenticated={setIsUserAuthenticated} />
              }
            />
            <Route path="/" element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
              <Route path="/" element={<Home />} />
            </Route>

            <Route path="/create-blog" element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
              <Route path="/create-blog" element={<CreateBlog />} />
            </Route>


          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
