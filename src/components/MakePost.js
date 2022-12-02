import React, { createRef, useState } from "react";
import Button from '@material-ui/core/Button'
import { NavigationState } from "../NavigationContext";
import { doc, setDoc, collection, Timestamp, addDoc, Firestore } from "firebase/firestore";
import { db } from "../firebase";
// , profilePic, image, username, timestamp, message

import { Avatar, makeStyles } from "@material-ui/core"

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

  const {content, setContent} = useState("");
  const {like, setLike} = useState("");
  const currentTime = new Date()
  const {time, setTime} = useState("");


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
        const postRef = collection(db, "Posts", "PostID");
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

  // test command
  const testThePost = async () => {
    const postID1 = user.uid + Timestamp.now().seconds.toString()
    const postRef1 = doc(db, "Posts", "hello1");
    const postResult1 = {
        comment: null,
        content: "I love basketball",
        creatorEmail: "abc@def.com", 
        like: false,
        time: Timestamp.now(),
    };


    const postID2 = user.uid + Timestamp.now().seconds.toString()
    const postRef2 = doc(db, "Posts", "hello2");
    const postResult2 = {
        comment: null,
        content: "I love teqball",
        creatorEmail: "abc@def.com", 
        like: false,
        time: Timestamp.now(),
    };
    await setDoc(postRef1, postResult1, {merge: true});
    await setDoc(postRef2, postResult2, {merge: true});
    console.log("Test writing to DB is successful, hells yeah")
  };
  // test command

    return (
    <>
    <div><Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#0055A2", marginTop: 126, color:'white',}}
        // onClick={handlePostCreationOpen}
        onClick={testThePost}
    >
        Write a post!
    </Button></div>

    {/* POST CREATION SECTION*/}
    <div>
    <Dialog
        open={postCreationOpen}
        onClose={handlePostCreationClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
    >
        <DialogTitle id="scroll-dialog-title">Create Post</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRefPostCreation}
              tabIndex={-1}
            >
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
                Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                  )
                  .join('\n')}
              </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePostCreationClose}>Subscribe</Button>
          <Button onClick={handlePostCreationClose}>Close</Button>
        </DialogActions>
      </Dialog>
        </div>
    {/* POST CREATION SECTION*/}
    </>
    ) 
}

export default MakePost