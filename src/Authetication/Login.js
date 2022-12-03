import React, { useState } from 'react';
import { Box, Button, TextField } from "@material-ui/core";
import { NavigationState } from '../NavigationContext';
import { auth } from '../firebase';
import { sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { GoogleAuthProvider } from "firebase/auth";



const Login = ({handleClose}) => {

  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setAlert} = NavigationState();
  const history = useHistory();

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
          history.push("/finder");

    }catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      });
    }
  };

  const resetPassword = () => {
    if(!email)return
    sendPasswordResetEmail(auth, email)
    .then(() => {
      setAlert({
        open:"true",
        message: "reset email sent",
        type:"success"
      })
     })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }
  
  const signInWithGoogle = () =>{
    signInWithPopup(auth, provider)
      .then((result) => {
        
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        setAlert({
          open:true,
          message: `Sign In Successful. Welcome Back ${result.user.email}`,
          type:"success",
        });
        
        handleClose();
        history.push("/finder");
        
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
            style={{marginTop: 0,}}
          />
          
          <Button
            variant="contained"
            size="large"
            style={{ backgroundColor: "#ff3333", marginTop: 126, color:'white', marginBottom:30}}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <div style={{display:"block", marginLeft:"auto", marginRight:"auto"}}> Or Instead:</div>
          <Button onClick={resetPassword} style={{color:"blue",}}> forgot password?</Button>
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

export default Login
