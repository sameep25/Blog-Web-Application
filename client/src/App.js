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
import CreateBlog from "./Pages/post/CreateBlog";
import DetailView from "./Pages/post/DetailView";
import UpdateBlog from "./Pages/post/UpdateBlog";
// COMPONENTS
import Login from "./Pages/Login";
import Header from "./components/Home/Header";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

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

            <Route path="/details/:id" element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
              <Route path="/details/:id" element={<DetailView />} />
            </Route>

            <Route path="/update/:id" element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
              <Route path="/update/:id" element={<UpdateBlog />} />
            </Route>

            <Route path="/about" element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
              <Route path="/about" element={<About />} />
            </Route>

            <Route path="/contact" element={<PrivateRoute isUserAuthenticated={isUserAuthenticated} />} >
              <Route path="/contact" element={<Contact />} />
            </Route>


          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
