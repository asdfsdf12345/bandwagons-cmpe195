import React from 'react'
import Banner from '../components/Banner'
import MakePost from '../components/MakePost';
import Post from '../components/Post'
import { NavigationState } from "../NavigationContext";
import { doc, collection, Timestamp, addDoc, Firestore } from "firebase/firestore";
import { db } from "../firebase";
import { query, where, getDocs } from "firebase/firestore";
import { useState } from 'react';

const Homepage = () => {

  const {user, setAlert} = NavigationState();
  const {postID, setPostID} = useState("3EY641Z4FSYMwAzDnFsNVDw0IaO21670004194")

  // React.useEffect(async () => {
  //   if (user) {
  //     //MULTIPLE DATA QUERY BLOCK aka GET DATA
  //     const q = query(collection(db, "Posts"), where("creatorEmail", "==", "abc@def.com"));
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //         console.log(doc.id, " => ", doc.data());
  //     });
  //   }});

  if (user) {
    return (
      <>
        <div><MakePost/></div>
        <div>
          <Post
            thePostID="3EY641Z4FSYMwAzDnFsNVDw0IaO21670004194"
          />
        </div> 
      </>
    )
  } else {
      return <div><Banner/></div>
    }
}


export default Homepage
