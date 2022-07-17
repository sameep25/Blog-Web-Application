import { React, useState, useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { DataContext } from "../../context/DataProvider";
import { googleLoginApi } from "../../service/api";

import { Box } from "@mui/material";

let initialUser = {
  name: "",
  username: "",
  googleId: "",
  picture: "",
  email: "",
};

const LoginGoogle = ({ setIsUserAuthenticated }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(initialUser);
  const { setAccount } = useContext(DataContext);

  const onLoginSuccess = (res) => {
    console.log(jwt_decode(res.credential));
    let userData = jwt_decode(res.credential);
    saveReleventData(userData);
  };

  const saveReleventData = async (userData) => {
    setUser({
      ...user,
      name: userData.name,
      username: userData.given_name,
      googleId: userData.sub,
      email: userData.email,
      picture: userData.picture,
    });
    console.log(user);
    let response = await googleLoginApi(user);
    if (response.status === 200) {
      console.log("success");
      setIsUserAuthenticated(true);
      setAccount({
        name: response.data.name,
        username: response.data.username,
        googleId: response.data.googleId,
        picture: response.data.picture,
        email: response.data.email,
      });
      navigate("/");
    }
  };

  const onLoginFailure = () => {
    console.log("Login Failed");
  };

  return (
    <Box>
      <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginFailure} />
    </Box>
  );
};

export default LoginGoogle;
