import React, { useState } from 'react';
import { Box, Button, TextField } from "@material-ui/core";
import { NavigationState } from '../NavigationContext';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';


const Login = ({handleClose}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {setAlert} = NavigationState();

  const handleSubmit = async () => {
    if(!email || !password) {
      setAlert({
        open: true,
        message:" missing email or password",
        type: 'error',
      });
      return;
    }

    try{
      const result = await signInWithEmailAndPassword(
        auth,email, password
      );

          setAlert({
            open:true,
            message: `Welcome Back ${result.user.email}`,
            type: 'success',
          });

          handleClose();
    }catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      });
    }
  };
  return (
    <Box 
        p={3}
        style= {{ display: "flex", flexDirection: "column", gap: "20px"}}
        >
          <TextField
            variant="outlined"
            type="email"
            label="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            variant="outlined"
            label="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            style={{marginTop: 0,}}
          />
          
          <Button
            variant="contained"
            size="large"
            style={{ backgroundColor: "#ff3333", marginTop: 126, color:'white',}}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Box>
  )
}

export default Login
