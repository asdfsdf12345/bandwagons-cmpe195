import React, { createRef, useState } from "react";
import { NavigationState } from "../NavigationContext";
import { doc, setDoc, collection, Timestamp, addDoc } from "firebase/firestore";
import { db } from "../firebase";
// , profilePic, image, username, timestamp, message

import { Avatar, makeStyles } from "@material-ui/core"
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import NearMeIcon from "@material-ui/icons/NearMe";
import { ExpandMoreOutlined, Navigation } from "@material-ui/icons";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";


const useStyles = makeStyles((theme) => ({
    post: {
        width: "100%",
        marginTop: "15px", 
        borderRadius: "15px", 
        backgroundColor: "white",
        boxShadow: "0px 5px 7px -7px rgba(0, 0, 0, 0.75)"
    },
  
    post__top: { 
        display: "flex",
        position: "relative",
        alignItems: "center",
        padding: "15px"
    },
  
    post__avatar: {
        marginRight: "10px",
    },
  
    post_topInfo:{
        "& > h3": {
            fontSize: "medium"
        },
    }, 

    post_topInfo:{
        "& > p": {
            fontSize: "small",
            color: "gray"
        },
    }, 

    post_image:{
        "& > img": {
            width: "100%"
        },
    }, 

    post__bottom: { 
        marginTop: "10px",
        marginBottom: "10px",
        padding: "15px 25px"
    },

    post__options: {
        paddingTop: "10px",
        borderTop: "1px solid lightgray",
        display: "flex",
        justifyContent: "space-evenly",
        fontSize: "medium",
        color: "gray",
        cursor: "pointer",
        padding: "15px",
    },

    post__option: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "5px",
        flex: 1,
    },

    post_image:{
        "& > p": {
            marginLeft: "10px"
        },
    }, 

    post_image:{
        "&:hover": {
            backgroundColor: "#eff2f5",
            borderRadius: "10px"
        },
    }, 
}));

const Post =   ({ profilePic, username,timestamp,message,image }) => {

  const {user, setAlert} = NavigationState();
  const classes = useStyles();

  const {content, setContent} = useState("");
  const {like, setLike} = useState("");
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
            stringExample: "Hello world!",
            booleanExample: true,
            numberExample: 3.14159265,
            dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
            arrayExample: [5, true, "hello"],
            nullExample: null,
            objectExample: {
                a: 5,
                b: {
                    nested: "foo"
                }
            }
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
    <div className= {classes.post}>
        
        <div className= {classes.post_top}>
            <Avatar src={profilePic} className= {classes.post__avatar} />
            <div className= {classes.post__topInfo}>
                <h3>{username}</h3>
                <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
            </div>
        </div>

        <div className= {classes.post__bottom}>
            <p>{message}</p>
        </div>

        <div className= {classes.post__image}>
            <img src={image} alt="post" />
        </div>

        <div className= {classes.post__options}>
            <div className= {classes.post__option}>
                <ThumbUpIcon />
                <p>Like</p>
            </div>

            <div className= {classes.post__option}>
                <ChatBubbleOutlineIcon />
                <p>Comment</p>
            </div>

        </div>
    </div>
    ) 
}

export default Post