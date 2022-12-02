import { AppBar, Box, Button, IconButton, ListItem, ListItemText, makeStyles, TextareaAutosize } from '@material-ui/core';
import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { FixedSizeList } from 'react-window';
import FriendList from '../components/FriendList';
import GroupCreateModal from '../components/GroupCreateModal';
import GroupList from '../components/GroupList';
import GroupRequestModal from '../components/GroupRequestModal';
import { NavigationState } from '../NavigationContext';
import AutoSizer from "react-virtualized-auto-sizer";
import { useEffect } from 'react';

const GroupMessagePage = () => {
    const{gid} = useParams();
    

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
    const[message,setMessage] = useState("");
    const {user} = NavigationState();
    
    

    useEffect(() => {
        console.log(message);
      }, []);

    const classes = useStyles();

    function renderRow(props) {
        const { index, style } = props;
        
        return (
            
          <ListItem style={style} key={index}>
            <ListItemText primary={`${messages[index]}`} />
            <ListItemText secondary={`${messages[index]}`} />          
          </ListItem>
        );
      }

  return (
    <>
    
    <div>
      <GroupList></GroupList>
      <div style={{
            width:2100, 
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
                <FixedSizeList height={height} width={width} itemSize={100} itemCount={200} 
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
            style={{width:"inherit", minHeight:50, maxHeight:100, fontSize:30}} 
            />            
            <IconButton>

            </IconButton>

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

export default GroupMessagePage