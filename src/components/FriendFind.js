import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, ButtonGroup, Divider, IconButton, ListItem, ListItemSecondaryAction, ListItemText, TextField } from '@material-ui/core';
import AutoSizer from "react-virtualized-auto-sizer";
import { NavigationState } from '../NavigationContext';
import { useState } from 'react';
import { async } from '@firebase/util';
import { addDoc, collection, doc, getDocs, getDoc, query, where, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FixedSizeList } from 'react-window';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ClearIcon from '@material-ui/icons/Clear';
import { borderBottom } from '@mui/system';
import { useEffect } from 'react';
import '../App.css';



export default function FriendFind() {

    const useStyles = makeStyles(() =>({
    
        bannerContent: {
            height:1000,
            display: "flex",
            flexDirection: "column",
        },
    
    }));
   
    
    const classes = useStyles();    
    const {setAlert, user, friends, setFriends,} = NavigationState();

    useEffect(() => {
        findFriends();
      }, []);
    
    //find friends
    const findFriends = async () => {
        try{
        
        console.log(user)
        const friendRef = collection(db, "Friends");
        const q = query(friendRef, where("friends", 'array-contains-any', [user.email]));
        const querySnapshot = onSnapshot(q, (querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {
        if(user.email == friends[0]){
        results.push(doc.data().friends[1]);
        }
        results.push(doc.data().friends[0]);
        });
        setFriends(results);
        console.log(friends);
        });
        
      }catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: 'error',
        });
      }
  };

  

  // each item in the list 
  function renderRow(props) {
    const { index, style } = props;

    return (
        
      <ListItem style={style} key={index}>
        <ListItemText primary={`${friends[index]}`} />
        
            
              
              
      </ListItem>
      
    );
  }



  return (
    /*
    <div
       style={{height: '95vh'}}
       
    >
        <AutoSizer>
        {({height, width}) => (
            <FixedSizeList height={height} width={width} itemSize={100} itemCount={friends.length}>
            {renderRow}
        </FixedSizeList>
        )}
        </AutoSizer>,
                
    </div>        

        
   */
  <>
  </>
  );
}