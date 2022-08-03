import { React, useState, useContext, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { DataContext } from "../../context/DataProvider";
import { googleLoginApi } from "../../service/api";

import { Box, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomBox = styled(Box)`
  margin: auto;
  width: 400px;
  margin-bottom : 50px ;
`;

const Image = styled("img")({
  width: 150,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0 ",
});
// __________________________________________________

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

  useEffect(() => {
    saveReleventData();
  }, [user]);

  const onLoginSuccess = (res) => {
    // console.log(jwt_decode(res.credential));
    let userData = jwt_decode(res.credential);
    setUser({
      ...user,
      name: userData.name,
      username: userData.given_name,
      googleId: userData.sub,
      email: userData.email,
      picture: userData.picture,
    });
  };

  const saveReleventData = async () => {
    // console.log(user);
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

  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <CustomBox>
            <Image src={imageURL} alt="Login" />
          </CustomBox>
        </Grid>
        <Grid item xs={12} md={12} sm={12} lg={12} style={{display : "flex" ,justifyContent:"center"}} >
          <GoogleLogin
            size={"medium"}
            onSuccess={onLoginSuccess}
            onError={onLoginFailure}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default LoginGoogle;
