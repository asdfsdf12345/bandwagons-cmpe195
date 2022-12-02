import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, TextField, TextareaAutosize } from '@material-ui/core';
import { NavigationState } from '../NavigationContext';
import { useState } from 'react';
import { async } from '@firebase/util';
import { addDoc, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import FriendList from './FriendList';
import FriendListMini from './FriendListMini';

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

export default function GroupCreateModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState(false);
  const [requestEmail, setRequestEmail] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const {setAlert, user, groupRequests, setGroupRequests} = NavigationState();
  const [data, setData] = useState();

  const createGroup = async () => {

    try{
      console.log(groupName);
      if (groupName === ""){
        setAlert({
          open: true,
          message: 'A group must have a name',
          type:'error',
        });
        return;
      }
      if (groupDescription === ""){
        setAlert({
          open: true,
          message: 'A group must have a description',
          type:'error',
        });
        return;
      }

      const groupRef = collection(db, "GroupRequests");
      console.log(groupRequests);

      const q = query(groupRef, where("groupName", "==", groupName), where("creatorID", "==", user.uid));
      
  
      const querySnapshot = await getDocs(q);
      
      console.log(querySnapshot.empty)
      if (querySnapshot.empty == false){
        setAlert({
          open: true,
          message: "A group with that name has already been created. Please delete the group before making it again.",
          type: 'error',
        });
        return;
      }
        

      const doc1 = await setDoc(doc(db, "GroupRequests", `${groupName + " " + user.uid}`), {
        requested: groupRequests,
        groupName: groupName,
        creatorID: user.uid
      });

      const doc2 = await setDoc(doc(db, "Groups", `${groupName + " " + user.uid}`), {
        groupName: groupName,
        groupDescription: groupDescription,
        creatorID: user.uid,
        members: [user.email]
      });

      setGroupRequests([]);

      setAlert({
        open: true,
        message: `Your group with name ${groupName} has been successfully created`,
        type: 'success',
      });

      handleCreationClose();
            
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
    setGroupRequests([]);
    setAlert({
      open: true,
      message: "The creation process has stopped midway. You must restart from the beginning",
      type: 'error',
    });
    setOpen(false);
    
  };

  const handleCreationClose = () => {
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
        Create Group
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
            <div> Choose a group Name :</div>
            <TextField
                id="name input"
                label="group name"
                variant= "outlined"
                value={groupName}
                style={{marginTop:10, marginBottom:10}}
                onChange={(e) => setGroupName(e.target.value)}
            />
            <div>Choose the people you would like to add to this group</div>
            <FriendListMini></FriendListMini>
            <div style={{marginTop:10}}>Create a short description for your group:</div>
            <TextareaAutosize
                id="description input"
                label="group description"
                variant= "outlined"
                value={groupDescription}
                style={{minWidth: 400, minHeight: 125, marginTop:10}}
                onChange={(e) => setGroupDescription(e.target.value)}
            />
            <div>
            <Button
                variant='contained'
                onClick= {createGroup}
                style={{
                marginTop: 10, 
                width: 400, 
                backgroundColor:"#fc3934", 
                border: 'solid',
                borderColor: '#fccb00',
                borderWidth: 2,
                color: 'white',}}
            >
                Create Group
            </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}