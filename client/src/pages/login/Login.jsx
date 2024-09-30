import React from "react";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(loginData);
  };
  return (
    <>
      <div>
        <Container
          maxWidth="xs"
          sx={{ backgroundColor: "", height: "100vh" }}
          display="flex"
          flex-direction="column"
          // align-items="center"
          // justify-content="center"
          align="center"
          justify-content="center"
        >
          <Box width={"100%"}>
            <Typography variant="h3" color="initial">
              Login
            </Typography>

            <TextField
              id="email"
              label="email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              fullWidth
            />
            <TextField
              id="password"
              label="password"
              type="password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              fullWidth
            />
            <Link to={"/signup"}>
              <Typography variant="body1" color="initial">
                Do not have an Acoount
              </Typography>
            </Link>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Login;
