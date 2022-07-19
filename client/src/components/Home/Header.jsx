import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";

import { DataContext } from "../../context/DataProvider";

// MUI
const StyledAppbar = styled(AppBar)`
  background: #fff;
  color: #000;
`;

const StyledButton = styled(Button)`
  color: inherit;
  font: inherit;
  text-transform: initial;
`;

const StyledToolbar = styled(Toolbar)`
  justify-content: center;
  & > a {
    padding: 20px;
    color: #000;
    text-decoration: none;
  }
`;

let initialUser = {
  name: "",
  username: "",
  googleId: "",
  picture: "",
  email: "",
};

const Header = () => {
  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const logout = () => {
    setAccount(initialUser);
    navigate("/google/login");
  };

  return (
    <>
      <StyledAppbar position="sticky">
        <StyledToolbar>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <StyledButton onClick={() => logout()}>Logout</StyledButton>
        </StyledToolbar>
      </StyledAppbar>
    </>
  );
};

export default Header;
