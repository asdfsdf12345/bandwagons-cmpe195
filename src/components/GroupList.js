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
import { useHistory } from 'react-router-dom';

export default function GroupList() {

//state variables
const [names, setNames] = useState([]);
const [groupDescriptions, setGroupDescriptions] = useState([]);
const {setAlert, user, friends, groups} = NavigationState();
const history = useHistory();
//friend class 

class Group {
    constructor (groupName, groupDescription, creatorID, members ) {
        this.groupName = groupName;
        this.groupDescription = groupDescription;
        this.creatorID = creatorID;
        this.members = members;
    }

    toString() {
        return this.groupName + ', ' + this.groupDescription + ', ' + this.creatorID;
    }

    getName(){
        return this.groupName;
    }

    getGroupDescription(){
        return this.groupDescription;
    }

    getMemberNumber(){
        return this.members.length;
    }

}

// Firestore data converter

const groupConverter = {
    toFirestore: (group) => {
        return {
            name: group.groupName,
            state: group.groupDescription,
            country: group.creatorID,
            members: group.members,
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Group(data.groupName, data.groupDescription, data.creatorID, data.members);
    }
};

useEffect(() => {
    displayGroups();
  }, []);

//get names


const getNames = async () => {
    try{
        
        const results = [];
        for (let i = 0; i < groups.length; i++) {
            //getFriend(friends[i]);
            const group = await getGroup(groups[i]);
            results.push(group.getName());
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

//get groupDescriptions

const getGroupDescriptions = async () => {
    try{
        
        const results = [];
        for (let i = 0; i < groups.length; i++) {
            //getFriend(friends[i]);
            const group = await getGroup(groups[i]);
            results.push(group.getGroupDescription());
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

const displayGroups = async () => {
    
    await getNames().then((response) =>{
        console.log(response);
        setNames(response);
        console.log(names);
    }) 
    
    await getGroupDescriptions().then((response) =>{
        console.log(response);
        setGroupDescriptions(response);
        console.log(groupDescriptions);
    }) 
    
}

//get data as friend class from db

const getGroup = async (name) => {
try{
console.log(name);
const docRef = doc(db, "Groups", name).withConverter(groupConverter);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
    const group = docSnap.data(); 
    return group;
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
        
      <ListItem button onClick={() => history.push(`/groups/${names[index]}`)} divider style={style} key={index}>
        <ListItemText primary={`${names[index]}`} />
        <ListItemText secondary={`${groupDescriptions[index]}`} />
        
            
              
              
      </ListItem>
    );
  }


return (
    
    <div
       style={{height: '95vh'}}
       
    >
        <AutoSizer>
        {({height, width}) => (
            <FixedSizeList height={height} width={width} itemSize={100} itemCount={names.length} style={{borderLeftStyle:"solid", borderColor: '#fccb00',
            borderWidth: 2,}}>
            {renderRow}
        </FixedSizeList>
        )}
        </AutoSizer>,
                
    </div>        

        
  );

}