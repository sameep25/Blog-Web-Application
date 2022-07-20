import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import DataProvider from "./context/DataProvider";

// PAGES
import Home from "./Pages/Home";
import CreateBlog from "./Pages/post/CreateBlog";
import DetailView from "./Pages/post/DetailView";
import UpdateBlog from "./Pages/post/UpdateBlog";
import LoginGoogle from "./Pages/account/LoginGoogle";
// COMPONENT
import Header from "./components/Home/Header";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

const clientID = process.env.REACT_APP_CLIENT_ID ;
// private routes to prevent direct routing
const PrivateRoute = ({ isUserAuthenticated, ...props }) => {
  return isUserAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/google/login" />
  );
};

function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  return (
    <GoogleOAuthProvider clientId={clientID}>
      <DataProvider>
        <Router>
          <Routes>
            
            <Route
              path="/google/login"
              element={
                <LoginGoogle setIsUserAuthenticated={setIsUserAuthenticated} />
              }
            />

            <Route
              path="/"
              element={
                <PrivateRoute isUserAuthenticated={isUserAuthenticated} />
              }
            >
              <Route path="/" element={<Home />} />
            </Route>

            <Route
              path="/create-blog"
              element={
                <PrivateRoute isUserAuthenticated={isUserAuthenticated} />
              }
            >
              <Route path="/create-blog" element={<CreateBlog />} />
            </Route>

            <Route
              path="/details/:id"
              element={
                <PrivateRoute isUserAuthenticated={isUserAuthenticated} />
              }
            >
              <Route path="/details/:id" element={<DetailView />} />
            </Route>

            <Route
              path="/update/:id"
              element={
                <PrivateRoute isUserAuthenticated={isUserAuthenticated} />
              }
            >
              <Route path="/update/:id" element={<UpdateBlog />} />
            </Route>

            <Route
              path="/about"
              element={
                <PrivateRoute isUserAuthenticated={isUserAuthenticated} />
              }
            >
              <Route path="/about" element={<About />} />
            </Route>

            <Route
              path="/contact"
              element={
                <PrivateRoute isUserAuthenticated={isUserAuthenticated} />
              }
            >
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Routes>
        </Router>
      </DataProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
