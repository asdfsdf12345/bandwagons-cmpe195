import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, ListItemAvatar, TextField, Typography, Avatar, ListItem } from '@material-ui/core';
import { NavigationState } from '../NavigationContext';
import { useState } from 'react';
import { async } from '@firebase/util';
import { addDoc, collection, doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore';
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
  const [emails, setEmails] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [requestEmail, setRequestEmail] = useState("");
  const [tags, setTags] = useState([]);
  const {setAlert, user} = NavigationState();
  

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

  const suggestedFriendRequest = async (email) => {

    try{
      
      const friendRef = collection(db, "FriendRequests");
      const q = query(friendRef, where("uEmail", "==", user.email), where("uEmail2", "==", email));
      
  
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
          uEmail2: email
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

  const getSuggested = async() =>{
    
    const docRef = doc(db, "Users", user.email);
    const docSnap = await getDoc(docRef);
    const result = [];
    const result2 = [];

    if(docSnap.exists()){
      setTags(docSnap.data().tags)
    }
    
    const colRef = collection(db, "Users");
    const q = query(colRef, where('tags', 'array-contains-any', [tags[0],tags[1], tags[2]]), limit(3));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      if(doc.data().email == user.email){
        
      }
      else{
        result.push(doc.data().email);
        //result2.push(doc.data().email);

      }
    });
    setEmails(result);
  }

  const handleOpen = () => {
    setOpen(true);
    getSuggested();
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
            <Typography align="center" >Add Friends by Suggestion:</Typography>
            <div style={{width:524, height:100, borderStyle:"solid"}}> 
                 {emails.map((email) =>{
                  return <ListItem><Button onClick ={() => suggestedFriendRequest}>{emails}<Avatar ></Avatar></Button></ListItem>
                 })}
            </div>
          </div>
          
        </Fade>
      </Modal>
    </>
  );
}