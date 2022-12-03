import React, { createRef, useState } from "react";
import Button from '@material-ui/core/Button'
import TemporaryDrawer from '../components/ProfileDrawer'
import HobbyTagChoices from '../components/HobbyTag'
import ProfileCreationButton from '../components/ProfileCreation'
import AvatarUpload from "../components/AvatarUpload";
import { NavigationState } from "../NavigationContext";
import { Box, makeStyles, MenuItem, TextField, Typography } from "@material-ui/core";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect } from "react";
import { getDownloadURL, ref } from "firebase/storage";

const useStyles = makeStyles((theme) => ({
  outer: {
    display:"columb",
  },

  inner: { 
    display: "flex", 
    flexDirection: "row",
    gap: "20px", 
    width:500, 
    marginLeft: 10, 
    marginTop: 60,
  },

  TextField: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  ToggleButton: {
    minWidth:200,
    backgroundColor:"#fc3934",
    color:"red"
  },

  bio: {
    
    border: "solid",
    borderWidth:1,
    marginTop: 20,
    marginLeft: 10, 
    width:500,

  },
}));

const ProfilePage = () => {

  const states = [
    {value: 'Alabama'}, {value: 'Alaska'},
    {value: 'Arizona'}, {value: 'Arkansas'},
    {value: 'California'}, {value: 'Colorado'},
    {value: 'Delaware'}, {value: 'Florida'},
    {value: 'Georgia'}, {value: 'Hawaii'},
    {value: 'Idaho'}, {value: 'Illinois'},
    {value: 'Indiana'}, {value: 'Iowa'},
    {value: 'Kansas'}, {value: 'Kentucky'},
    {value: 'Louisiana'}, {value: 'Maine'},
    {value: 'Maryland'}, {value: 'Massachusetts'},
    {value: 'Michigan'}, {value: 'Minnesota'},
    {value: 'Mississippi'}, {value: 'Missouri'},
    {value: 'Montana'}, {value: 'Nebraska'},
    {value: 'Nevada'}, {value: 'New Hampshire'},
    {value: 'New Jersey'}, {value: 'New Mexico'},
    {value: 'New York'}, {value: 'North Carolina'},
    {value: 'North Dakota'}, {value: 'Ohio'},
    {value: 'Oklahoma'}, {value: 'Oregon'},
    {value: 'Pennsylvania'}, {value: 'Rhode Island'},
    {value: 'South Carolina'}, {value: 'South Dakota'},
    {value: 'Tennessee'}, {value: 'Texas'},
    {value: 'Utah'}, {value: 'Vermont'},
    {value: 'Virginia'}, {value: 'Washington'},
    {value: 'West Virginia'}, {value: 'Wisconsin'}, 
    {value: 'Wyoming'}
  ];

  const [formats, setFormats] = useState(() => ['']);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName ]= useState("");
  const [bio, setBio ]= useState("");
  const [city, setCity ]= useState("");
  const [state, setState] = useState('');

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const {setAlert, user, photo, setPhoto} = NavigationState();

  const handleSubmit = async () => {
    if(formats.length <4 || formats.length >4) {
      setAlert({
        open: true,
        message:`please select 3 main hobbies: ${formats.length -1}`,
        type: 'error',
      });
      return;
    }    

    try{
      const result = await setDoc(doc(db, "Users", user.email), {
        firstName: firstName ,
        lastName: lastName,
        bio: bio,
        uid: user.uid,
        email: user.email,
        tags:[formats[1], formats[2], formats[3]],
        state: state,
        photoURL: photo,
      },
     {merge: true}
      );

      setAlert({
        open: true,
        message: "You have successfully updated your profile",
        type: 'success',
      });
          
    }catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      });
    }
  };
  

  return (
    <>
      {/*
      <><BasicTextFields/></>
      <br/>
      <><AvatarUpload/></>
      <div>Pick your preferences</div>
      <><HobbyTagChoices/></>
      <br/><br/><br/>
      <Button variant="contained">Save Profile</Button>
  */}
  <Typography variant="h1" align="center"> Profile</Typography>
      <Box
      className= {classes.outer}
  
  
  >
    <Box></Box>
      <Box
      component="form"
      noValidate
      autoComplete="off"
      className={classes.inner}
    >

      <TextField
        id="outlined-name-input"
        label="first name"
        type="name"
        variant="outlined"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <TextField
        id="outlined-last-name-input"
        label="last name"
        type="lastName"
        variant="outlined"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <TextField
        id="outlined-states-select"
        select
        label="State"
        value={state}
        onChange={handleStateChange}
        helperText="Please select your state"
        variant="outlined"
      >
        {states.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
    </Box>
      
    <div>
    <TextField
        id="outlined-city-input"
        label="city"
        type="city"
        variant="outlined"
        value={city}
        style={{marginLeft:10}}
        onChange={(e) => setCity(e.target.value)}
      />
      </div>

    <TextField
        id="outlined-bio-input"
        label="Bio"
        className={classes.bio}
        multiline
        rows={4}
        variant= "outlined"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        />
    

    <div style={{maxWidth:200, marginTop:50, marginLeft:10}}>
        <ToggleButtonGroup
        style={{minWidth:300}}
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
        >
            <ToggleButton className={classes.ToggleButton} value="Painting" aria-label="Painting">Painting</ToggleButton>
            <ToggleButton className={classes.ToggleButton} value="Crafts" aria-label="Crafts">Crafts</ToggleButton>
            <ToggleButton className={classes.ToggleButton} value="Music" aria-label="Music">Music</ToggleButton>
            <ToggleButton className={classes.ToggleButton} value="Dance" aria-label="Dance">Dance</ToggleButton>
            <ToggleButton className={classes.ToggleButton} value="Literary" aria-label="Literary">Literary</ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
        style={{minWidth:300}}
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
        >
            <ToggleButton className={classes.ToggleButton} value="Discussion/Debate" aria-label="Discussion/Debate">Discussion/Debate</ToggleButton>
            <ToggleButton className={classes.ToggleButton} value="Tutor/Education" aria-label="Tutor/Education">Tutor/Education</ToggleButton>
            <ToggleButton className={classes.ToggleButton} value="Career" aria-label="Career">Career</ToggleButton>
            <ToggleButton className={classes.ToggleButton} value="Team Sports" aria-label="Team Sports">Team Sports</ToggleButton>
            <ToggleButton className={classes.ToggleButton} value="Martial Arts" aria-label="Martial Arts">Martial Arts</ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
        >
          <ToggleButton className={classes.ToggleButton} value="Fitness" aria-label="Fitness">Fitness</ToggleButton>
          <ToggleButton className={classes.ToggleButton} value="Outdoor" aria-label="Outdoor">Outdoor</ToggleButton>
          <ToggleButton className={classes.ToggleButton} value="Motorsports" aria-label="Motorsports">Motorsports</ToggleButton>
          <ToggleButton className={classes.ToggleButton} value="Extreme" aria-label="Extreme">Extreme</ToggleButton>
          <ToggleButton className={classes.ToggleButton} value="Nature" aria-label="Nature">Nature</ToggleButton>
        </ToggleButtonGroup>
      
        <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
        >
          <ToggleButton className={classes.ToggleButton} value="Relaxing/Tranquil" aria-label="Relaxing/Tranquil">Relaxing/Tranquil</ToggleButton>
          <ToggleButton className={classes.ToggleButton} value="Health" aria-label="Health">Health</ToggleButton>
          <ToggleButton className={classes.ToggleButton} value="Volunteer" aria-label="Volunteer">Volunteer</ToggleButton>
          <ToggleButton className={classes.ToggleButton} value="Gardening" aria-label="Gardening">Gardening</ToggleButton>
          <ToggleButton className={classes.ToggleButton} value="Collecting" aria-label="Collecting">Collecting</ToggleButton>
      </ToggleButtonGroup>

      <ToggleButtonGroup
      value={formats}
      onChange={handleFormat}
      aria-label="text formatting"
      >
            <ToggleButton className={classes.ToggleButton} value="Tabletop Games" aria-label="Tabletop Games">Tabletop Games</ToggleButton>
            <ToggleButton className={classes.ToggleButton} value="Clothing" aria-label="Clothing">Clothing</ToggleButton>
            <ToggleButton className={classes.ToggleButton} value="Cooking" aria-label="Cooking">Cooking</ToggleButton>
            <ToggleButton className={classes.ToggleButton} value="Engineering/Utility" aria-label="Engineering/Utility">Engineering/Utility</ToggleButton>
            <ToggleButton className={classes.ToggleButton} value="Restoration" aria-label="Restoration">Restoration</ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={formats}
          onChange={handleFormat}
          aria-label="text formatting"
        >
            <ToggleButton className={classes.ToggleButton} value="Animals" aria-label="Animals">Animals</ToggleButton>
        </ToggleButtonGroup>
    </div>
    </Box>
    <div style={{marginTop:50}}>
        <AvatarUpload>
        
        </AvatarUpload>
    </div>
      
    <Button
      variant='contained'
      style={{
       
      position:"fixed",
      width: 400, 
      bottom:0,
      backgroundColor:"#fc3934", 
      border: 'solid',
      borderColor: '#fccb00',
      borderWidth: 2,
      color: 'white',}}
      onClick={handleSubmit}
      >
      Confirm
    </Button>
    
    </>

    


  )
}

export default ProfilePage
