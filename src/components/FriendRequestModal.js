import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, ListItem, ListItemText, TextField } from '@material-ui/core';
import { NavigationState } from '../NavigationContext';
import { useState } from 'react';
import { async } from '@firebase/util';
import { addDoc, collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { FixedSizeList } from 'react-window';
import PropTypes from 'prop-types';

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
 
  


  const displayFriendRequest = async () => {

    try{
      
      
            
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
    unsubscribe();
  };

  function renderRow(props) {
    const { index, style } = props;
  
    return (
      <ListItem button style={style} key={index}>
        <ListItemText primary={`Item ${requested[index]}`} />
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

            <div className={classes.root}>
                <FixedSizeList height={400} width={300} itemSize={60} itemCount={requested.length}>
                    {renderRow}
                </FixedSizeList>
            </div>
            
            <Button
                variant='contained'
                onClick={displayFriendRequest}
            >
                Send Friend Request
            </Button>
        
          </div>
        </Fade>
      </Modal>
    </>
  );
}

