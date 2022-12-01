import React from 'react'
import Banner from '../components/Banner'
import MakePost from '../components/MakePost';
import Post from '../components/Post'
import { NavigationState } from "../NavigationContext";
import { doc, collection, Timestamp, addDoc, Firestore } from "firebase/firestore";
import { db } from "../firebase";

const Homepage = () => {

  const {user, setAlert} = NavigationState();


  if (user) {
    return (
      <>
        <div><MakePost/></div>
        <div><Post/></div> 
      </>
    )
  } else {
    return <div><Banner/></div>
  }
}

export default Homepage
