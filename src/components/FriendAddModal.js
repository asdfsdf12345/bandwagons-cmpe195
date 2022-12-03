import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, TextField, Typography } from '@material-ui/core';
import { NavigationState } from '../NavigationContext';
import { useState } from 'react';
import { async } from '@firebase/util';
import { addDoc, collection, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

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

export default function FriendAddModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState(false);
  const [requestEmail, setRequestEmail] = useState("");
  const {setAlert, user} = NavigationState();
  const [data, setData] = useState();

  const sendFriendRequest = async () => {

    try{
      
      const friendRef = collection(db, "FriendRequests");
      const q = query(friendRef, where("uEmail", "==", user.email), where("uEmail2", "==", requestEmail));
      
  
      const querySnapshot = await getDocs(q);
      
      console.log(querySnapshot.empty)
      if (querySnapshot.empty == false){
        setAlert({
          open: true,
          message: "A request has already been sent to that user. Please wait for a response before trying again",
          type: 'error',
        });
        return;
      }
        
        const result = await addDoc(collection(db, "FriendRequests"), {
          uEmail: user.email,
          uEmail2: requestEmail
        }
        );
        setAlert({
          open: true,
          message: `Friend Request sent to ${requestEmail}`,
          type: 'success',
        });
            
      }catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: 'error',
        });
      }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
      variant = "contained" 
      onClick={handleOpen}
      style={{
          height: 40,
          float:"right",
          backgroundColor: "#fc3934",
          border: 'solid',
          borderColor: '#fccb00',
          borderWidth: 2,
          color: 'white',
      }}
      >
        Add Friend
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
            <Typography> Enter the email address of the person you'd like to send this request to</Typography>
            <TextField
                id="email input"
                label="requestEmail"
                variant= "outlined"
                value={requestEmail}
                onChange={(e) => setRequestEmail(e.target.value)}
            />
            <Button
                variant='contained'
                style={{
       
                  
                  width: 300, 
                  height:55,
                  backgroundColor:"#fc3934", 
                  border: 'solid',
                  borderColor: '#fccb00',
                  borderWidth: 2,
                  color: 'white',}}
                onClick= {sendFriendRequest}
            >
                Send Friend Request
            </Button>
        
          </div>
        </Fade>
      </Modal>
    </>
  );
}