import React, { createRef, useState } from "react";
import { NavigationState } from "../NavigationContext";
import { doc, setDoc, getDoc, updateDoc, collection, Timestamp, addDoc, Firestore } from "firebase/firestore";
import { db } from "../firebase";

import { Avatar, makeStyles } from "@material-ui/core"
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { FirebaseError } from "firebase/app";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Divider, Grid, Paper } from "@material-ui/core";
const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";


const Post = ({ postID }) => {
    
{/* POST BOX SECTION*/}
  // const {user, setAlert} = NavigationState();
  const classes = useStyles();

//   const {postID, setPostID} = useState(thePostID)
  const [creatorEmail, setCreatorEmail] = useState("");
  const [content, setContent] = useState("");
  const [like, setLike] = useState("");
  const [time, setTime] = useState("");
  const [displayName, setDisplayName] = useState("")

    React.useEffect(async () => {
    const docRefPost = doc(db, "Posts", postID);
    const docSnapPost = await getDoc(docRefPost);
    if (docSnapPost.exists()) {
        console.log("Document data:", docSnapPost.data());
        setCreatorEmail(docSnapPost.get("creatorEmail"));
        setContent(docSnapPost.get("content"));
        setLike(docSnapPost.get("like"));
        setTime(docSnapPost.get("time").toDate().toLocaleString());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }});



  //To get first and last name
  React.useEffect(async () => {
    const docRefUser = doc(db, "Users", creatorEmail);
    const docSnapUser = await getDoc(docRefUser);
    if (docSnapUser.exists()) {
        console.log("Document data:", docSnapUser.data());
        setDisplayName(docSnapUser.get("firstName") + " " + docSnapUser.get("lastName"));
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }});
  
{/* POST BOX SECTION*/}


const [scroll, setScroll] = React.useState('paper');


{/* COMMENT SECTION*/}
  const [commentOpen, setCommentOpen] = React.useState(false);
  const handleCommentOpen = () => () => {
      setCommentOpen(true);
  };
  
  const handleCommentClose = () => {
      setCommentOpen(false);
  };

  const descriptionElementRefComment = React.useRef(null);
  React.useEffect(() => {
    //COMMENT BLOCK
  if (commentOpen) {
      const { current: descriptionElement } = descriptionElementRefComment;
      if (descriptionElement !== null) {
      descriptionElement.focus();
      }
  }
  }, [commentOpen]);


{/* COMMENT SECTION*/}


{/* LIKE SECTION*/}
    const handleLike = async () => { 
        const newLike = like + 1;
        console.log("postID is...  "+ postID)
        setLike(newLike);
        const changeLikeRef = doc(db, "Posts", postID);
        const changeLikeResult = {like: newLike};
        updateDoc(changeLikeRef, changeLikeResult);
    }
{/* LIKE SECTION*/}

    return (
    <>
    {/* POST BOX SECTION*/}
    <Paper className={classes.paper}>
    <Grid container wrap="nowrap" spacing={2} gridColumn="span 4">
        <Grid item>
        <Avatar alt={displayName} src={imgLink} />
        </Grid>
        
        <Grid justifyContent="left" item xs zeroMinWidth>
        <h4 style={{ margin: 0, textAlign: "left" }}>{displayName}</h4>
        <p style={{ textAlign: "left" }}>
            {content}
        </p>
        <p style={{ textAlign: "left", color: "gray" }}>
            posted at {time}
        </p>
        <div className= {classes.post__options}>
            <div className= {classes.post__option}>
                <ThumbUpIcon
                    onClick={handleLike}
                />
                <p>{like}</p>
            </div>

            {/* <div className= {classes.post__option}>
                <ChatBubbleOutlineIcon
                    onClick={handleCommentOpen('paper')}
                />
                <p onClick={handleCommentOpen('paper')}>Comment</p>
            </div> */}

        </div>
        </Grid>
    </Grid>
    </Paper>

    <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
    <div className= {classes.post}>
        {/* <div className= {classes.post_top}>
            <Avatar src={profilePic} className= {classes.post__avatar} />
            <div className= {classes.post__topInfo}>
                <h3>{username}</h3>
                <p>{"Date is " + currentTime.getDate() + ", Month is " + currentTime.getMonth()}</p>
            </div>
        </div>

        <div className= {classes.post__bottom}>
            <p>{message}</p>
        </div>

        <div className= {classes.post__image}>
            <img src={image} alt="post" />
        </div> */}

        {/* <div className= {classes.post__options}>
            <div className= {classes.post__option}>
                <ThumbUpIcon />
                <p>Like</p>
            </div>

            <div className= {classes.post__option}>
                <ChatBubbleOutlineIcon />
                <p>Comment</p>
            </div>

        </div> */}
    </div>
    {/* POST BOX SECTION*/}


    {/* COMMENT SECTION*/}
    <div>
        <Dialog
          open={commentOpen}
          onClose={handleCommentClose}
          scroll={"paper"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
        {/* <DialogTitle id="scroll-dialog-title">Comment</DialogTitle> */}
        <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRefComment}
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
          <Button onClick={handleCommentClose}>Subscribe</Button>
          <Button onClick={handleCommentClose}>Close</Button>
        </DialogActions>
      </Dialog>
        </div>
    {/* COMMENT SECTION*/}
    </>
    ) 
}

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
        alignItems: "center",
        justifyContent: "center",
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

    paper: {
        maxWidth: 400,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
}));

export default Post