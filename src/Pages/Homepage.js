import React from 'react'
import Banner from '../components/Banner'
import Description from '../components/Description'
import FriendFind from '../components/FriendFind'
import GroupFind from '../components/GroupFind'

const Homepage = () => {
  return (
    <>
    <GroupFind></GroupFind>
    <FriendFind></FriendFind>
    <Banner/>
    <Description/>
    </>

  )
}

export default Homepage
