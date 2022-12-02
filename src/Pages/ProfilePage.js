import React, { createRef, useState } from "react";
import Button from '@material-ui/core/Button'
import TemporaryDrawer from '../components/ProfileDrawer'
import HobbyTagChoices from '../components/HobbyTag'
import ProfileCreationButton from '../components/ProfileCreation'
import AvatarUpload from "../components/AvatarUpload";
import { NavigationState } from "../NavigationContext";
import { Box, makeStyles, MenuItem, TextField, Typography } from "@material-ui/core";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

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
  const [state, setState] = useState('');

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const {setAlert, user} = NavigationState();

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
      const result = await setDoc(doc(db, "Users", user.uid), {
        firstName: firstName ,
        lastName: lastName,
        bio: bio,
        uid: user.uid,
        email: user.email,
        tag1: formats[1],
        tag2: formats[2],
        tag3: formats[3],
        state: state,
        photoURL: user.photoURL,
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
      <Box
      className= {classes.outer}
  
  
  >
      <Box
      component="form"
      noValidate
      autoComplete="off"
      className={classes.inner}
    >

      <TextField
        id="standard-name-input"
        label="first name"
        type="name"
        variant="standard"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <TextField
        id="standard-last-name-input"
        label="last name"
        type="lastName"
        variant="standard"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <TextField
        id="standard-states-select"
        select
        label="State"
        value={state}
        onChange={handleStateChange}
        helperText="Please select your state"
        variant="standard"
      >
        {states.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
    </Box>
      
    <TextField
        id="standard-bio-input"
        label="Bio"
        className={classes.bio}
        multiline
        rows={4}
        variant= "outlined"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        />
    

    <div>
        <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
        >
            <ToggleButton value="Painting" aria-label="Painting">Painting</ToggleButton>
            <ToggleButton value="Crafts" aria-label="Crafts">Crafts</ToggleButton>
            <ToggleButton value="Music" aria-label="Music">Music</ToggleButton>
            <ToggleButton value="Dance" aria-label="Dance">Dance</ToggleButton>
            <ToggleButton value="Literary" aria-label="Literary">Literary</ToggleButton>
            <ToggleButton value="Discussion/Debate" aria-label="Discussion/Debate">Discussion/Debate</ToggleButton>
            <ToggleButton value="Tutor/Education" aria-label="Tutor/Education">Tutor/Education</ToggleButton>
            <ToggleButton value="Career" aria-label="Career">Career</ToggleButton>
            <ToggleButton value="Team Sports" aria-label="Team Sports">Team Sports</ToggleButton>
            <ToggleButton value="Martial Arts" aria-label="Martial Arts">Martial Arts</ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
      value={formats}
      onChange={handleFormat}
      aria-label="text formatting"
      >
          <ToggleButton value="Fitness" aria-label="Fitness">Fitness</ToggleButton>
          <ToggleButton value="Outdoor" aria-label="Outdoor">Outdoor</ToggleButton>
          <ToggleButton value="Motorsports" aria-label="Motorsports">Motorsports</ToggleButton>
          <ToggleButton value="Extreme" aria-label="Extreme">Extreme</ToggleButton>
          <ToggleButton value="Nature" aria-label="Nature">Nature</ToggleButton>
          <ToggleButton value="Relaxing/Tranquil" aria-label="Relaxing/Tranquil">Relaxing/Tranquil</ToggleButton>
          <ToggleButton value="Health" aria-label="Health">Health</ToggleButton>
          <ToggleButton value="Volunteer" aria-label="Volunteer">Volunteer</ToggleButton>
          <ToggleButton value="Gardening" aria-label="Gardening">Gardening</ToggleButton>
          <ToggleButton value="Collecting" aria-label="Collecting">Collecting</ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
      value={formats}
      onChange={handleFormat}
      aria-label="text formatting"
      >
            <ToggleButton value="Tabletop Games" aria-label="Tabletop Games">Tabletop Games</ToggleButton>
            <ToggleButton value="Clothing" aria-label="Clothing">Clothing</ToggleButton>
            <ToggleButton value="Cooking" aria-label="Cooking">Cooking</ToggleButton>
            <ToggleButton value="Engineering/Utility" aria-label="Engineering/Utility">Engineering/Utility</ToggleButton>
            <ToggleButton value="Restoration" aria-label="Restoration">Restoration</ToggleButton>
            <ToggleButton value="Animals" aria-label="Animals">Animals</ToggleButton>
        </ToggleButtonGroup>
    </div>
    </Box>
 
    <Button
      variant="contained"
      size="large"
      style={{ backgroundColor: "#0055A2", marginTop: 126, color:'white',}}
      onClick={handleSubmit}
      >
      Confirm
    </Button>
    
    </>

    


  )
}

export default ProfilePage
