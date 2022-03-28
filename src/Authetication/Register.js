import React, { useState } from 'react';
import { Box, Button, TextField } from "@material-ui/core";
import { NavigationState } from '../NavigationContext';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = ({handleClose}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {setAlert} = NavigationState();

  const handleSubmit = async () => {
    if (password !== confirmPassword){
      setAlert({
        open: true,
        message: 'passwords do not match',
        type:'error',
      });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
        );

        console.log(result);

        setAlert({
          open: true,
          message: 'Thank you, Welcome to Bandwagons!',
          type: 'success',
        });

      handleClose()
    } catch (error){
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
        style={{marginTop: 20,}}
      />
      <TextField
        variant="outlined"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#ff3333", marginTop: 30, color:'white',}}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  )
}

export default Register
