// Show user's added Friends

import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";
import SpringModal from "../components/FriendAddModal";
import TransitionsModal from "../components/FriendAddModal";
import FriendAddModal from "../components/FriendAddModal";
import FriendRequestModal from "../components/FriendRequestModal";


const FriendsPage = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const handleClick = () => {
  };

  const addFriend= () => {
  };

  return (
    <>
      <div>FRIEND</div>

      <List>
        <ListItemButton onClick={handleClick}>
          <Avatar alt="profile1" src="./photos/Profile1.jpg" style={{ height: '80px', width: '80px' }}></Avatar>
          <ListItemText
            primary="John Appleseed"
            secondary={
              <div>
                <div>Go Spartans!!</div>
                <div>California</div>
              </div>
            }
          />
        </ListItemButton>
      </List>
      <div
      position="fixed" 
      style={{height: "100%" ,width: "100%"}}>
      <FriendAddModal></FriendAddModal>  
      <FriendRequestModal></FriendRequestModal>
      </div>
        
    </> 
  )
}


export default FriendsPage
