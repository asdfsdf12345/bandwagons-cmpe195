import React from 'react'
import { useState } from "react";
import Button from '@material-ui/core/Button'
import TemporaryDrawer from '../components/ProfileDrawer'
import BasicTextFields from '../components/TextField'
import HobbyTagChoices from '../components/HobbyTag'
import ProfileCreationButton from '../components/ProfileCreation'
import IconButton from '@mui/material/IconButton';
import Avatar from "@material-ui/core/Avatar";

const ProfilePage = () => {
  
  return (
    <>
      <div id = "button2">
        <Button 
        variant="contained">{TemporaryDrawer()}
        </Button>
      </div>
      <div>
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" />
          <Avatar alt="profile-avatar" style={{ height: '80px', width: '80px' }}></Avatar>
        </IconButton>
      </div>
      <><BasicTextFields/></>
      <div>Pick your preferences</div>
      <><HobbyTagChoices/></>
      <br/><br/><br/>
      <><ProfileCreationButton/></>
    </>

  )
}

export default ProfilePage
