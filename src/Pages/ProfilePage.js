import React, { createRef, useState } from "react";
import Button from '@material-ui/core/Button'
import TemporaryDrawer from '../components/ProfileDrawer'
import BasicTextFields from "../components/TextField";
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
      <Typography component="div">
      <Box sx={{ textAlign: 'center', 
        fontSize: 32,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        m: 2 }}>Profile</Box>
      </Typography>
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
