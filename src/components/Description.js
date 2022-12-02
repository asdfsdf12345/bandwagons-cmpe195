import { Typography } from '@material-ui/core'
import React from 'react'


const Description = () => {
 
    return (
    <div>
      <Typography align='center' variant="h1" style={{fontSize:48, alignItems:"center", marginTop:30}}>
        Welcome to BandWagons
      </Typography>

      <Typography align='center' variant="subtitle1" style={{fontSize:30, alignItems:"center", marginTop:50}}>
        BandWagons is a social media created to help the user find friends and hobbies around them. We offer locational services, messaging capabililities, and allow for users to find friends near them to go out and make friends. 
        We believe BandWagons is a powerful tool that would allow users to connect, find interesting things to do, and enjoy themselves more. We hope you enjoy your time here. Thankyou!
      </Typography>
    </div>
  )
}

export default Description
