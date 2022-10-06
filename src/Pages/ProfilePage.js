import React, { createRef, useState } from "react";
import Button from '@material-ui/core/Button'
import TemporaryDrawer from '../components/ProfileDrawer'
import BasicTextFields from '../components/TextField'
import HobbyTagChoices from '../components/HobbyTag'
import ProfileCreationButton from '../components/ProfileCreation'
import AvatarUpload from "../components/AvatarUpload";

const ProfilePage = () => {

  return (
    <>
      <div id = "button2">
        <Button 
        variant="contained">{TemporaryDrawer()}
        </Button>
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
