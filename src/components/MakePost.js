import React, { createRef, useState } from "react";
import Button from '@material-ui/core/Button'
import { NavigationState } from "../NavigationContext";
import { doc, setDoc, collection, Timestamp, addDoc, Firestore } from "firebase/firestore";
import { db } from "../firebase";
// , profilePic, image, username, timestamp, message

import { Avatar, makeStyles, TextField } from "@material-ui/core"

// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
  const [content, setContent] = useState("");

    {/* POST CREATION SECTION*/}
    const [scroll, setScroll] = React.useState('paper');
    const [postCreationOpen, setPostCreationOpen] = React.useState(false);

    const handlePostCreationOpen = () => {
        setPostCreationOpen(true);
    };

    const handlePostCreationClose = () => {
        setPostCreationOpen(false);
    };

    const descriptionElementRefPostCreation = React.useRef(null);

    React.useEffect(() => {
    if (postCreationOpen) {
        const { current: descriptionElement } = descriptionElementRefPostCreation;
        if (descriptionElement !== null) {
        descriptionElement.focus();
        }
    }
    }, [postCreationOpen]);
    {/* POST CREATION SECTION*/}

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
      const postID = user.uid + Timestamp.now().seconds.toString()
      const postRef = doc(db, "Posts", postID);
      const postResult = {
          comment: null,
          content: content,
          creatorEmail: user.email, 
          like: 0,
          time: Timestamp.now(),
      };
      await setDoc(postRef, postResult, {merge: true});
        
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
        onClick={handlePostCreationOpen}
        // onClick={testThePost}
    >
        Write a post!
    </Button></div>

    {/* POST CREATION SECTION*/}
    <div>
    <Dialog
        open={postCreationOpen}
        onClose={handlePostCreationClose}
        scroll={"paper"}
        fullWidth
        maxWidth="sm"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
    >
        <DialogTitle id="scroll-dialog-title">Create Post</DialogTitle>
        
        <TextField
        id="standard-bio-input"
        type="postContent"
        multiline
        rows={9}
        variant="outlined"
        value={content}
        onChange={(e) => {
          setContent(e.target.value)
        }}
      />
        
        <DialogActions>
          <Button onClick={() => {
            handlePostSubmit()
            handlePostCreationClose()
          }}>Submit</Button>
          <Button onClick={handlePostCreationClose}>Close</Button>
        </DialogActions>
      </Dialog>
        </div>
    {/* POST CREATION SECTION*/}
    </>
    ) 
}

export default MakePost