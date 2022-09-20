// Show user's added Friends

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";


const FriendsPage = () => {

  const handleClick = () => {
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
    </>
  )
}


export default FriendsPage
