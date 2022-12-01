import React, { createRef, useState } from "react";
import Button from '@material-ui/core/Button'
import { NavigationState } from "../NavigationContext";
import { doc, setDoc, collection, Timestamp, addDoc, Firestore } from "firebase/firestore";
import { db } from "../firebase";
// , profilePic, image, username, timestamp, message

import { Avatar, makeStyles } from "@material-ui/core"


const useStyles = makeStyles((theme) => ({
    post: {
        width: "100%",
        marginTop: "15px", 
        borderRadius: "15px", 
        backgroundColor: "white",
        boxShadow: "0px 5px 7px -7px rgba(0, 0, 0, 0.75)"
    },
}));

const MakePost =   ({  }) => {

  const {user, setAlert} = NavigationState();
  const classes = useStyles();

  const {content, setContent} = useState("");
  const {like, setLike} = useState("");
  const currentTime = new Date()
  const {time, setTime} = useState("");


  const handlePostSubmit = async () => {
    if(content.trim().length === 0) {
      setAlert({
        open: true,
        message:`Your post is empty!`,
        type: 'error',
      });
      return;
    }
    
    try {
        const postRef = collection(db, "Posts");
        const postResult = {
            comment: null,
            content: "I love guitars",
            creatorEmail: "abc@def.com", 
            like: false,
            time: "November 30, 2022 at 9:32:20 AM UTC-8",
        };
        await addDoc(postRef, postResult, {merge: true});
        
    } catch (error) {
        setAlert({
            open: true,
            message: error.message,
            type: 'error',
        });
    }
  };

    return (
    <>
        <div><Button
            variant="contained"
            size="large"
            style={{ backgroundColor: "#0055A2", marginTop: 126, color:'white',}}
            onClick={handlePostSubmit}
        >
        Write a post!
        </Button></div>
    </>
    ) 
}

export default MakePost