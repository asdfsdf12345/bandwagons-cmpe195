import React from 'react'
import Banner from '../components/Banner'
import MakePost from '../components/MakePost';
import Post from '../components/Post'
import { NavigationState } from "../NavigationContext";
import { doc, collection, Timestamp, addDoc, Firestore, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from 'react';
import { Grid } from "@material-ui/core";

const Homepage = () => {

  const {user, setAlert} = NavigationState();
  const {postID, setPostID} = useState("3EY641Z4FSYMwAzDnFsNVDw0IaO21670004194")
  const [postQueueArray, setPostQueueArray] = useState([]);

  React.useEffect(async () => {
    if (user) {
      //MULTIPLE DATA QUERY BLOCK aka GET DATA
      const q = query(collection(db, "Posts"), where("creatorEmail", "==", "abc@def.com"));
      const querySnapshot = await getDocs(q);
      const queryResult = [];
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          queryResult.push(
            doc.id
          )
      });
      setPostQueueArray(queryResult);
      console.log(postQueueArray);
    }});


  function renderPost(props) {
    const { index, style } = props;

    return (
        
      <ListItem style={style} key={index}>
        <Post postID = {postQueueArray[index]}/>
        
            
              
              
      </ListItem>
      
    );
  }


  if (user) {
    return (
      <>
        {/* <div><MakePost/></div> */}
        {/* <Grid container spacing={1}>
          {postQueueArray}
        </Grid> */}
        <Post
              postID={doc.id}
            />
      
      <div
       style={{height: '95vh'}}
      >
        <AutoSizer>
        {({height, width}) => (
            <FixedSizeList height={height} width={width} itemSize={100} itemCount={names.length}>
            {renderPost}
        </FixedSizeList>
        )}
        </AutoSizer>,          
        </div>  
        {/* {console.log({postQueueArray})} */}
      </>
    )
  } else {
      return <div><Banner/></div>
    }
}


export default Homepage
