import React from 'react'
import Banner from '../components/Banner'
import MakePost from '../components/MakePost';
import Post from '../components/Post'
import { NavigationState } from "../NavigationContext";
import { doc, collection, Timestamp, addDoc, Firestore } from "firebase/firestore";
import { db } from "../firebase";
import { query, where, getDocs } from "firebase/firestore";

const Homepage = () => {

  const {user, setAlert} = NavigationState();

  React.useEffect(async () => {
    if (user) {
      //MULTIPLE DATA QUERY BLOCK aka GET DATA
      const q = query(collection(db, "Posts"), where("creatorEmail", "==", "abc@def.com"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
      });
    }});

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
