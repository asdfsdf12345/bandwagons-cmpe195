import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, ListItem, ListItemText, TextField } from '@material-ui/core';
import { NavigationState } from '../NavigationContext';
import { useState } from 'react';
import { async } from '@firebase/util';
import { addDoc, collection, doc, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { FixedSizeList } from 'react-window';
import PropTypes from 'prop-types';

export default function FriendRequestList() {
    
    const [open, setOpen] = useState(false);
    const {setAlert, user} = NavigationState();
    const [requested, setRequested] = useState([]);
      
    const findFriendRequest = async () => {

        try{
        const friendRef = collection(db, "FriendRequests");
        const q = query(friendRef, where("uEmail2", "==", user.email)); 
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const cities = [];
        querySnapshot.forEach((doc) => {
        cities.push(doc.data().uEmail);
        setRequested(cities);
        console.log(requested);
    });
    console.log("Current cities in CA: ", cities.join(", "));
    });
        }catch (error) {
            setAlert({
            open: true,
            message: error.message,
            type: 'error',
            });
        }
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
              <div>
                  <FixedSizeList height={400} width={300} itemSize={60} itemCount={requested.length}>
                      {renderRow}
                  </FixedSizeList>
              </div>   
        
      </>
    );
  }
