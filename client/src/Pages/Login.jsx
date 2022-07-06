import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../context/DataProvider";

// api
import { signupUserApi, loginUserApi } from "../service/api";

// mui
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// MUI STYLED COMPONENTS__________________
const CustomBox = styled(Box)`
  margin: auto;
  width: 400px;
  min-height: 100vh;
`;

const WrapperBox = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  & > * {
    margin-top: 10px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  border-radius: 2px;
  margin-top: 10px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  border-radius: 2px;
`;

const Text = styled(Typography)`
  margin-top: 10px;
  color: #878787;
  font-size: 12px;
`;

const Image = styled("img")({
  width: 150,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0 ",
});
// __________________________________________________

// initial values for signupValues state (object)
const initialSignupValues = {
  name: "",
  username: "",
  password: "",
};
// initial values for loginValues state (object)
const initialLoginValues = {
  username: "",
  password: "",
};

const Login = ( {setIsUserAuthenticated} ) => {
  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  const [toogleAccount, setToogleAccount] = useState("login");
  const [signupValues, setSignupValues] = useState(initialSignupValues);
  const [loginValues, setLoginValues] = useState(initialLoginValues);

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate() ;

  // saving changes from signup form
  const onInputChangeSignup = (e) => {
    setSignupValues({ ...signupValues, [e.target.name]: e.target.value });
  };

  // saving changes from login form
  const onInputChangeLogin = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
  };

  // api for signup new user
  const signupUser = async () => {
    const response = await signupUserApi(signupValues);
    if (response.status === 200) {
      setSignupValues(initialSignupValues);
      setToogleAccount("login");
    }
  };

  // api for login existing user
  const loginUser = async () => {
    const response = await loginUserApi(loginValues);
    // console.log(response);
    if (response.status === 200) {
      // console.log("check");
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );

      // globally setting user data
      setAccount({
        username: response.data.username,
        name: response.data.name,
      });

      setIsUserAuthenticated(true) ;
      navigate('/') ;

    }
  };

  return (
    <Grid>
      <Grid item xs={6} md={8}>
        <CustomBox>
          <Image src={imageURL} alt="Login" />

          {toogleAccount === `login` ? ( // conditional rendering
            //login
            <WrapperBox>
              <TextField
                label="User-Name"
                variant="standard"
                name="username"
                onChange={(e) => onInputChangeLogin(e)}
              />
              <TextField
                label="Password"
                variant="standard"
                name="password"
                onChange={(e) => onInputChangeLogin(e)}
              />
              <LoginButton variant="contained" onClick={() => loginUser()}>
                Login
              </LoginButton>
              <Text>OR</Text>
              <SignupButton
                variant="text"
                onClick={() => setToogleAccount("signup")}
              >
                Sign-Up
              </SignupButton>
            </WrapperBox>
          ) : (
            // signup
            <WrapperBox>
              <TextField
                label="Enter Name"
                variant="standard"
                name="name"
                onChange={(e) => onInputChangeSignup(e)}
              />
              <TextField
                label="Enter User-Name"
                variant="standard"
                name="username"
                onChange={(e) => onInputChangeSignup(e)}
              />
              <TextField
                label="Enter Password"
                variant="standard"
                name="password"
                onChange={(e) => onInputChangeSignup(e)}
              />

              <LoginButton variant="contained" onClick={() => signupUser()}>
                Create account
              </LoginButton>
              <Text>OR</Text>
              <SignupButton
                variant="text"
                onClick={() => setToogleAccount("login")}
              >
                Already have an account
              </SignupButton>
            </WrapperBox>
          )}
        </CustomBox>
      </Grid>
    </Grid>
  );
};

export default Login;
