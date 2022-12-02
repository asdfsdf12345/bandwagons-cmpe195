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

export default function FriendList() {

//state variables
const [names, setNames] = useState([]);
const [bios, setBios] = useState([]);
const {setAlert, user, friends, setFriends,} = NavigationState();

//friend class 

class Friend {
    constructor (firstName, lastName, bio ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.bio = bio;
    }

    toString() {
        return this.firstName + ', ' + this.lastName + ', ' + this.bio;
    }

    getName(){
        return this.firstName + ' ' + this.lastName;
    }

    getBio(){
        return this.bio;
    }
    
}

// Firestore data converter

const friendConverter = {
    toFirestore: (friend) => {
        return {
            name: friend.firstName,
            state: friend.lastName,
            country: friend.bio
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Friend(data.firstName, data.lastName, data.bio);
    }
};

useEffect(() => {
    displayFriends();
  }, []);

//get names

const getNames = async () => {
    try{
        console.log("hello");
        const results = [];
        for (let i = 0; i < friends.length; i++) {
            //getFriend(friends[i]);
            const friend = await getFriend(friends[i]);
            results.push(friend.getName());
          }
          console.log(results);
          return results;

  }catch (error) {
    setAlert({
      open: true,
      message: error.message,
      type: 'error',
    });
  }

  
};

//get Bios

const getBios = async () => {
    try{
        console.log("hello");
        const results = [];
        for (let i = 0; i < friends.length; i++) {
            //getFriend(friends[i]);
            const friend = await getFriend(friends[i]);
            results.push(friend.getBio());
          }
          console.log(results);
          return results;

  }catch (error) {
    setAlert({
      open: true,
      message: error.message,
      type: 'error',
    });
  }

  
};

//get both and set state variables

const displayFriends = async () => {
    await getNames().then((response) =>{
        console.log(response);
        setNames(response);
        console.log(names);
    }) 

    await getBios().then((response) =>{
        console.log(response);
        setBios(response);
        console.log(bios);
    }) 
}

//get data as friend class from db

const getFriend = async (email) => {
try{
console.log(email);
const docRef = doc(db, "Users", email).withConverter(friendConverter);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
    const friend = docSnap.data(); 
    return friend;
    } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    }

}catch (error) {
setAlert({
    open: true,
    message: error.message,
    type: 'error',
});
}
};

//render row function for window list. USE THIS TO STYLE LIST ITEMS.

function renderRow(props) {
    const { index, style } = props;

    return (
        
      <ListItem divider style={style} key={index}>
        <ListItemText primary={`${names[index]}`} />
        <ListItemText secondary={`${bios[index]}`} />
        
            
              
              
      </ListItem>
    );
  }


return (
    
    <div
       style={{height: '92vh', width: '30vh'}}
        
    >
        <AutoSizer>
        {({height, width}) => (
            <FixedSizeList height={height} width={width} itemSize={100} itemCount={names.length} 
            style={{ 
            borderRightStyle:"solid",
            borderBottomStyle:"solid", 
            borderColor: "#fc3934",
            borderWidth: 3,
            backgroundColor:"#fce547",
            }}>
            {renderRow}
        </FixedSizeList>
        )}
        </AutoSizer>,
                
    </div>        

        
  );

}