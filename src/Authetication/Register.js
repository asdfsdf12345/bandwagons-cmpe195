import React, { useState } from 'react';
import { Box, Button, TextField } from "@material-ui/core";
import { NavigationState } from '../NavigationContext';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useHistory } from 'react-router-dom';


const Register = ({handleClose}) => {

  const provider = new GoogleAuthProvider();
  const history = useHistory();
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

      const result2 = await signInWithEmailAndPassword(
        auth,email, password
      );  

        setAlert({
          open: true,
          message: `Thank you, Welcome to Bandwagons! ${result2.user.email}`,
          type: 'success',
        });

      handleClose()
      history.push("/profile")

    } catch (error){
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      });
    }
  };
 
  const signInWithGoogle = () =>{
    signInWithPopup(auth, provider)
      .then((result) => {
        
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        setAlert({
          open:true,
          message: `Sign In Successful. Welcome to Bandwagons ${result.user.email}`,
          type:"success",
        });
        
        handleClose();
        history.push("/profile");
        
      }).catch((error) => {
        // Handle Errors here.
        setAlert({
          open:true,
          message: error.message,
          type:"error"
        });
        
  });
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
        style={{ backgroundColor: "#ff3333", marginTop: 30, color:'white', marginBottom:30}}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
      <div style={{display:"block", marginLeft:"auto", marginRight:"auto"}}> Or Instead:</div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{  marginTop: 10, color:'white',}}
        onClick={signInWithGoogle}
      >
        Sign In With Google
      </Button>
    </Box>
  )
}

export default Register
