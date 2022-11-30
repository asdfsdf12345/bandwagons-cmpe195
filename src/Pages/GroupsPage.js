// Show user's added Friends

import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { AppBar, Button, makeStyles, Toolbar } from "@material-ui/core";
import SpringModal from "../components/FriendAddModal";
import TransitionsModal from "../components/FriendAddModal";
import FriendAddModal from "../components/FriendAddModal";
import FriendRequestModal from "../components/FriendRequestModal";
import FriendFind from "../components/FriendFind";
import FriendList from "../components/FriendList";

import GroupCreateModal from "../components/GroupCreateModal";
import GroupRequestModal from "../components/GroupRequestModal";
import GroupList from "../components/GroupList";
import GroupFind from "../components/GroupFind";


const GroupsPage = () => {

  const useStyles = makeStyles((theme) => ({
    appbar: {
      top:'auto',
      bottom: 0,
      defaultStyles: "none"
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  
  const classes = useStyles();

  return (
    <div
    
    >

      <GroupFind></GroupFind>
      <GroupList></GroupList>
     
        <AppBar
        color="transparent"
          className={classes.appbar}
        >
          <div>
            <GroupCreateModal></GroupCreateModal>
            <GroupRequestModal></GroupRequestModal>
          </div>
        </AppBar>
          
          
     
      
      
    </div> 
  )
}


export default GroupsPage
