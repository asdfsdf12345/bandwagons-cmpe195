import React from 'react'
import { Typography, Box } from "@material-ui/core";

const SettingsPage = () => {
  return (
    <div>
      <Typography component="div">
        <Box sx={{ textAlign: 'center', 
          fontSize: 32,
          fontWeight: 'bold',
          textTransform: 'capitalize',
          m: 2 }}>Settings</Box>
      </Typography>
    </div>
  )
}

export default SettingsPage
