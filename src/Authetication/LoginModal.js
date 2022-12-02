import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar'
import  Tabs from '@material-ui/core/Tabs';
import  Tab from '@material-ui/core/Tab';
import Login from"./Login";
import Register from"./Register";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { NavigationState } from '../NavigationContext';
import { auth } from '../firebase';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function LoginModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {setAlert} = NavigationState();

  const provider = new GoogleAuthProvider();

  const signinWithGoogle = () => {
    signInWithPopup(auth, provider).then( res => {
      
      const credential = GoogleAuthProvider.credentialFromResult(res);
      const token = credential.accessToken;
      setAlert({
        open: true,
        message: `Welcome ${res.user.email}`,
      })
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  };

  return (
    <div>
      <Button
        variant = "contained" 
        style={{
            width: 75,
            height: 40,
            marginRight: 15,
            backgroundColor: "#fc3934",
            border: 'solid',
            borderColor: '#fccb00',
            borderWidth: 2,
            color: 'white',
        }}
        onClick={handleOpen}
      >
          Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar 
                position ='static'
                style={{ backgroundColor: "transparent", color: 'black'}} 
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    style={{borderRadius:10}}
                >
                    <Tab label= "Login"/>
                    <Tab label= "Register"/>
                </Tabs>
                    </AppBar>

                    {value ===0 && <Login handleClose={handleClose}/>}
                    {value ===1 && <Register handleClose={handleClose}/>}
                    
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

