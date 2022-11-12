import React, { createRef, useState } from "react";
import Button from '@material-ui/core/Button'
import TemporaryDrawer from '../components/ProfileDrawer'
import BasicTextFields from '../components/TextField'
import HobbyTagChoices from '../components/HobbyTag'
import ProfileCreationButton from '../components/ProfileCreation'
import AvatarUpload from "../components/AvatarUpload";
import { Box } from "@material-ui/core";

const ProfilePage = () => {

  return (
    <>
      <div id = "button2">
        <Button 
        variant="contained">{TemporaryDrawer()}
        </Button>
      </div>
      
      <><BasicTextFields/></>
      <br/>
      <Box sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16}}>Avatar</Box>
      <><AvatarUpload/></>
      <br/>
      <Box sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16}}>Pick your preferences</Box>
      <><HobbyTagChoices/></>
      <br/><br/>
      <><ProfileCreationButton/></>
    </>

  )
}

export default ProfilePage
