import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, ButtonGroup, Divider, IconButton, ListItem, ListItemSecondaryAction, ListItemText, TextField } from '@material-ui/core';
import { NavigationState } from '../NavigationContext';
import { useState } from 'react';
import { async } from '@firebase/util';
import { addDoc, collection, doc, getDocs, query, where, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FixedSizeList } from 'react-window';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ClearIcon from '@material-ui/icons/Clear';
import { borderBottom } from '@mui/system';

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

export default function FriendRequestModal() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [requestEmail, setRequestEmail] = useState("");
    const {setAlert, user} = NavigationState();
    const [requested, setRequested] = useState([]);

    //display requests
    const findFriendRequest = async () => {
        try{
        const friendRef = collection(db, "FriendRequests");
        const q = query(friendRef, where("uEmail2", "==", user.email)); 
        const querySnapshot = onSnapshot(q, (querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {
        results.push(doc.data().uEmail);
        console.log(requested);
    });
    setRequested(results);
});

      }catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: 'error',
        });
      }
  };

  //accept friend request
  const acceptRequest = async (pos) => {

    //add friend
    try{
          const result = await addDoc(collection(db, "Friends"), {
            friends: [user.email, requested[pos]]
          }
          );

          //delete request info
          const friendRef = collection(db, "FriendRequests");
          const q = query(friendRef, where("uEmail", "==", requested[pos]), where("uEmail2", "==", user.email));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            console.log(doc.ref)
            deleteDoc(doc.ref); 
            
        });

          setAlert({
            open: true,
            message: `You have successfully added ${requested[pos]}`,
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

//declineRequest
const declineRequest = async (pos) => {

    //deny friend
    try{
          //delete request info
          const friendRef = collection(db, "FriendRequests");
          const q = query(friendRef, where("uEmail", "==", requested[pos]), where("uEmail2", "==", user.email));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            console.log(doc.ref)
            deleteDoc(doc.ref); 
            
        });

          setAlert({
            open: true,
            message: `${requested[pos]}'s request has been declined`,
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
    findFriendRequest();
  };

  const handleClose = () => {
    setOpen(false);
    
  };

  // each item in the list 
  function renderRow(props) {
    const { index, style } = props;
  
    return (
        
      <ListItem style={style} key={index}>
        <ListItemText primary={`${requested[index]}`} />
            
              <ButtonGroup>
              <IconButton edge="end" 
              style={{ color: "#2ab530"}}
              onClick={() => acceptRequest(index)}
              >
                <CheckCircleIcon />
              </IconButton>
              <IconButton 
              edge="end"
              style={{ color: "#c9202e", marginLeft: 20}}
              onClick={() => declineRequest(index)}
              >
                <ClearIcon/>
              </IconButton>
              </ButtonGroup>
              
      </ListItem>
      
    );
  }



  return (
    <>
      <Button
      variant = "contained" 
      onClick={handleOpen}
      style={{
          height: 40,
          float:"left",
          backgroundColor: "#fc3934",
          border: 'solid',
          borderColor: '#fccb00',
          borderWidth: 2,
          color: 'white',
      }}
      >
        Friend Requests
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
            <div> Pending Friend Requests</div>

            <div >
                <FixedSizeList height={400} width={320} itemSize={48} itemCount={requested.length }>
                    {renderRow}
                </FixedSizeList>
            </div>

        
          </div>
        </Fade>
      </Modal>
    </>
  );
}

