import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, ButtonGroup, Divider, IconButton, ListItem, ListItemSecondaryAction, ListItemText, TextField } from '@material-ui/core';
import { NavigationState } from '../NavigationContext';
import { useState } from 'react';
import { async } from '@firebase/util';
import { addDoc, collection, doc, getDocs, query, where, onSnapshot, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
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

export default function GroupRequestModal() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const {setAlert, user} = NavigationState();
    const [requested, setRequested] = useState([]);
    const [pendingRequested, setPendingRequested] = useState([]);
    const [requestedId, setRequestedId] = useState([]);
    const [members, setMembers] = useState([]);

    //display requests
    const findGroupRequest = async () => {
        try{
        console.log(user.email);
        const groupRef = collection(db, "GroupRequests");
        const q = query(groupRef, where("requested", "array-contains", user.email)); 
        const querySnapshot = onSnapshot(q, (querySnapshot) => {
        const nameResults = [];
        const idResults = [];
        //const 
        querySnapshot.forEach((doc) => {
        nameResults.push(doc.data().groupName);
        idResults.push(doc.data().creatorID);
        console.log(requested);
        console.log(requestedId);
    });
    setRequested(nameResults);
    setRequestedId(idResults);
});

      }catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: 'error',
        });
      }
  };

  //accept group request
  const acceptRequest = async (pos) => {

    //add group
    try{

          
          //name of group doc
          const docName = requested[pos] + " " + requestedId[pos]
          console.log(docName);

          //delete request info
          const groupRequestRef = doc(db, "GroupRequests", docName);
          const docSnap = await getDoc(groupRequestRef);
          if(docSnap.exists()){
            const temp = docSnap.data().requested;
            for(let x in temp){
              if(temp[x] === user.email)
              console.log(temp.splice(x,1))
              console.log(temp);
              
            }
            setPendingRequested(temp);
            console.log(pendingRequested);
          }
          else{
            console.log("No such document!");
          }
          
          //get Document info
          const groupRef = doc(db, "Groups", docName);
          const docSnap2 = await getDoc(groupRef);
          
          
          if (docSnap2.exists()) {
            console.log("Document data:", docSnap2.data());
            console.log(docSnap2.data().members);
            setMembers([...docSnap2.data().members, user.email]);
            console.log(members);
            
            
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
          
        //add member to group
        const result = await setDoc(doc(db, "Groups", docName), {
          members: members
        },
        {merge: true}
        );

        //remove member from requested
        const result2 = await setDoc(doc(db, "GroupRequests", docName), {
          requested: pendingRequested,
        },
        {merge: true}
        );

          setAlert({
            open: true,
            message: `You have been successfully added to group ${requested[pos]}`,
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
          const docName = requested[pos] + " " + requestedId[pos];
          const groupRequestRef = doc(db, "GroupRequests", docName);
          const docSnap = await getDoc(groupRequestRef);
          if(docSnap.exists()){
            const temp = docSnap.data().requested;
            for(let x in temp){
              if(temp[x] === user.email)
              console.log(temp.splice(x,1))
              console.log(temp);
              
            }
            setPendingRequested(temp);
            console.log(pendingRequested);
          }
          else{
            console.log("No such document!");
          }
            
          const result = await setDoc(doc(db, "GroupRequests", docName), {
            requested: pendingRequested,
          },
          {merge: true}
          );

          setAlert({
            open: true,
            message: `The request for ${requested[pos]} has been declined`,
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
    findGroupRequest();
  };

  const handleClose = () => {
    setOpen(false);
    
  };

  // each item in the list 
  function renderRow(props) {
    const { index, style } = props;
  
    return (
       
      <ListItem divider style={style} key={index}>
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
        Group Requests
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
            <div> Pending Group Requests</div>

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

