import React from 'react'
import Banner from '../components/Banner'
import Post from '../components/Post'
import { NavigationState } from "../NavigationContext";

const Homepage = () => {

  const {user, setAlert} = NavigationState();

  if (user) {
    return <div><Post/></div> 
  } else {
    return <div><Banner/></div>
  }
}

export default Homepage
