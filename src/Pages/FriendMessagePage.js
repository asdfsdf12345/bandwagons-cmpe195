import { AppBar, Box, Button, IconButton, ListItem, ListItemText, makeStyles, TextareaAutosize } from '@material-ui/core';
import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { FixedSizeList } from 'react-window';
import SendIcon from '@material-ui/icons/Send';
import GroupCreateModal from '../components/GroupCreateModal';
import GroupList from '../components/GroupList';
import GroupRequestModal from '../components/GroupRequestModal';
import { NavigationState } from '../NavigationContext';
import AutoSizer from "react-virtualized-auto-sizer";
import { useEffect } from 'react';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import FriendList from '../components/FriendList';

const FriendMessagePage = () => {
  const{fid} = useParams();
  console.log(fid);

  const useStyles = makeStyles((theme) => ({
    appbar: {
      top:'auto',
      bottom: 0,
      defaultStyles: "none",
      marginTop:1,
      position:"fixed",
      display:"block",
      flexDirection:"column",
    },
  }));

  const[messages, setMessages] = useState([]);
  const[ids, setIds] = useState([]);
  const[message,setMessage] = useState("");
  const {user} = NavigationState();

  useEffect(() => {
    getMessages(fid);

   
  }, [fid]);

  const classes = useStyles();

  const handleSend = async() =>{


      const docRef = await addDoc(collection(db, "Friends", `${fid}`, "messages"), {
          message: message,
          email: user.email,
          createdAt: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);

      console.log(message);
  }

  const getMessages = async(fid) =>{
    const messageRef = collection(db, "Friends", `${fid}`, "messages");
    const q= query(messageRef, orderBy("createdAt"));

    const unsub= onSnapshot(q, (querySnapshot) => {
        const results = [];
        const results2 = [];
        querySnapshot.forEach((doc) => {
            results.push(doc.data().message);
            results2.push(doc.data().email);
        });
        setMessages(results);
        setIds(results2);
      });
      console.log(messages);
    
      return () => {
        setMessages([]);
        unsub();
    }
  }

  function renderRow(props) {
    const { index, style } = props;
   
    const check = () =>{
        if(user.email === ids[index] )  return true;
        return false;
    }

    
    if(check()){
        return (

            <ListItem style={style} key={index}>
                <ListItemText style={{color:"white", display:"flex", flexDirection:"row" }} 
                primary={
                    <div>
                        <div style={{maxWidth:"max-content", height: 50, backgroundColor:"#fc3934", borderRadius: '10px', padding:'10px 20px'}} >
                        {messages[index]}
                        </div>
                        <div style={{fontSize:12, color:"black"}}>
                        {`Sent by: ${ids[index]}`}
                        </div>
                    </div>
                    }
                >  </ListItemText> 
                
                       
              </ListItem>
          
        ); 
    }

    return (

        <ListItem style={style} key={index}>
                
                <ListItemText style={{color:"white", display:"flex", flexDirection:"row-reverse" }} 
                primary={
                    <div>
                        <div style={{maxWidth:"max-content", height: 50, backgroundColor:"#9d0000", borderRadius: '10px', padding:'10px 20px'}} >
                            {messages[index]}
                        </div>
                        <div style={{fontSize:12, color:"black"}}>
                        {`Sent by: ${ids[index]}`}
                        </div>
                    </div>
                }

                >  
                  
                </ListItemText> 
                
                       
              </ListItem>
      
    );
  }

  return (
    <>
    
    <div>
      <FriendList></FriendList>
      <div style={{
            width:'80vw', 
            height:'92vh', 
            //borderStyle:"solid",
            borderRightStyle:"none",
            borderTopStyle:"none", 
            borderColor:"#fc3934",
            float:"right", 
            right:0, 
            position:"fixed",
            backgroundColor:"#B0B0B0"
        }}> 
            <AutoSizer>
                {({height, width}) => (
                <FixedSizeList height={height} width={width} itemSize={100} itemCount={messages.length} 
                style={{
                borderRightStyle:"solid",
                //borderBottomStyle:"solid", 
                borderColor: "#fc3934",
                borderWidth: 3,
                backgroundColor:"#B0B0B0",
                }}>
                {renderRow}
            </FixedSizeList>
            )}
            </AutoSizer>,
            <div style={{
                width:"inherit", 
                height:50, 
                
                float:"bottom",
                position:"fixed",
                backgroundColor:"#B0B0B0",
                bottom:42
                }}>
            
            <TextareaAutosize 
            aria-label="empty textarea" placeholder="Type a message..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{width:'78vw', minHeight:50, maxHeight:100, fontSize:30, position:"fixed", bottom:42}} 
            >
            
            </TextareaAutosize>    
            <div
            style={{width:"2vw", height:50, backgroundColor:"white", float:"right", borderStyle:"solid", borderWidth:1, borderLeftStyle:"none", marginBottom:10}}
            >
                <IconButton style={{}} onClick={handleSend}><SendIcon></SendIcon></IconButton>

                </div>       
            
           

            </div>
      </div>
    </div>

        <AppBar
        color="transparent"
          className={classes.appbar}
        >
          <div>
            <GroupCreateModal></GroupCreateModal>
            <GroupRequestModal></GroupRequestModal>
          </div>
        </AppBar>
        
    </>
  )
}

export default FriendMessagePage