import React from 'react'
import {Typography, Box } from "@material-ui/core";

const EventsPage = () => {
  return (
    
    <div>
      <Typography component="div">
        <Box sx={{ textAlign: 'center', 
          fontSize: 32,
          fontWeight: 'bold',
          textTransform: 'capitalize',
          m: 2 }}>Events</Box>
      </Typography>
    </div>
  )
}

export default EventsPage
