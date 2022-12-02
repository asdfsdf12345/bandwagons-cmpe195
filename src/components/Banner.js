import { makeStyles, Container } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(() =>({
    
    bannerContent: {
        height: 500,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },

}));

const Banner = () => {
    const classes = useStyles();

  return (
    <div>
        <img id = 'banner1' src='./Banner.jpg'/>
      
    </div>
  )
}

export default Banner
