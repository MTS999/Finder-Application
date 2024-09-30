import React from "react";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import useSignUp from "../../hooks/useSignUp";
const Signup = () => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const {loading,signUp}=useSignUp();

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(signUpData)
    await signUp(signUpData);
    
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
              Signup
            </Typography>
            <TextField
              id="name"
              label="name"
              value={signUpData.name}
              onChange={(e) =>
                setSignUpData({ ...signUpData, name: e.target.value })
              }
              fullWidth={true}
            />
            <TextField
              id="email"
              label="email"
              value={signUpData.email}
              onChange={(e) =>
                setSignUpData({ ...signUpData, email: e.target.value })
              }
              fullWidth
            />
            <TextField
              id="password"
              label="password"
              type="password"
              value={signUpData.password}
              onChange={(e) =>
                setSignUpData({ ...signUpData, password: e.target.value })
              }
              fullWidth
            />
            <TextField
              id="confirmPassword"
              label="confirm password"
              type="password"
              value={signUpData.confirmPassword}
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  confirmPassword: e.target.value,
                })
              }
              fullWidth
            />
            <Link to={"/login"}>
              <Typography variant="body1" color="initial">
                ALready have an acount
              </Typography>
            </Link>

            <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>
              SignUp
            </Button>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Signup;
