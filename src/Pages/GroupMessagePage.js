import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import FriendList from '../components/FriendList';
import { NavigationState } from '../NavigationContext';


const GroupMessagePage = () => {
    const{gid} = useParams();
    console.log(gid);

    const[messages, setMessages] = useState([]);
    const {user} = NavigationState();

  return (
    <div>hello</div>
  )
}

export default GroupMessagePage