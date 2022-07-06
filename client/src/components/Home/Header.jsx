import React from "react";

import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// MUI
const StyledAppbar = styled(AppBar)`
  background: #fff;
  color: #000;
`;

const StyledToolbar = styled(Toolbar)`
  justify-content: center;
  & > a {
    padding: 20px;
    color: #000;
    text-decoration: none;
  }
`;

const Header = () => {
  return (
    <>
      <StyledAppbar position="sticky">
        <StyledToolbar>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Logout</Link>
        </StyledToolbar>
      </StyledAppbar>
    </>
  );
};

export default Header;
