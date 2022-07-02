import { React, useState } from "react";

// api
import { signupUserApi } from "../../service/api";

// mui
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

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

const initialSignupValues = {
  name: "",
  username: "",
  password: "",
};

const Login = () => {
  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  const [toogleAccount, setToogleAccount] = useState("login");
  const [signupValues, setSignupValues] = useState(initialSignupValues);

  const onInputChange = (e) => {
    setSignupValues({ ...signupValues, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    await signupUserApi(signupValues);
  };

  return (
    <Grid>
      <Grid item xs={6} md={8}>
        <CustomBox>
          <Image src={imageURL} alt="Login" />

          {toogleAccount === `login` ? (
            //login
            <WrapperBox>
              <TextField label="User-Name" variant="standard" />
              <TextField label="Password" variant="standard" />
              <LoginButton variant="contained">Login</LoginButton>
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
                onChange={(e) => onInputChange(e)}
              />
              <TextField
                label="Enter User-Name"
                variant="standard"
                name="username"
                onChange={(e) => onInputChange(e)}
              />
              <TextField
                label="Enter Password"
                variant="standard"
                name="password"
                onChange={(e) => onInputChange(e)}
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
