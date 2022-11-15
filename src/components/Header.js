import { IconButton, Menu, MenuItem, AppBar, Container, Toolbar, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import LoginModal from '../Authetication/LoginModal';
import { Link, useHistory } from 'react-router-dom';
import NavigationContext, { NavigationState } from '../NavigationContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';


const useStyles = makeStyles(() => ({
    title:{
      flex: 1,
      fontWeight: "bold",
      cursor: "pointer",
      marginLeft: 0, 
    },

    appbar:{
        color: "white",
        outline: "#fc3934",
        backgroundColor: "#fc3934",
        borderStyle: 'solid',
        borderColor: '#fccb00',
        borderTopStyle: 'hidden',
        borderLeftStyle: 'hidden',
        borderWidth: 2
    },

    link:{
        color: "#3b3939",
        textDecoration: "None",
    }
    

}))

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    

    const handleClose = () => {
        setAnchorEl(null)
    }
 
    const openMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const {user, setAlert} = NavigationState();

    const history = useHistory();

    const classes=useStyles();

    const logout = () => {
        
        signOut(auth);

        setAlert({
            open:true,
            type: "success",
            message: "Logout Successful",
        });
        
        handleClose();
    }

  return (
    <AppBar color ='transparent'  position='static' className={classes.appbar}>
        
        
            <Toolbar>
                <Typography onClick={() => history.push('/')} className={classes.title}>
                    Bandwagons
                </Typography>
                {user ? 
                <IconButton 
                color="default"
                onClick={(openMenu)}
                style={{ width: 0, height: 40, MarginRight: 30 }}
                >
                    <ArrowDropDownIcon/>
                </IconButton> : <LoginModal/> }

                <Menu
                    id='navMenu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    
                >
                    <MenuItem
                        onClick={handleClose
                        }
                        id = 'Profile'
                    >
                    <Link to="/profile" className= {classes.link} >Profile </Link> 
                    </MenuItem>
                    <MenuItem
                        onClick={handleClose}
                        id = 'Events'
                    >
                    <Link to="/events" className= {classes.link}>Events </Link> 
                    </MenuItem>
                    <MenuItem
                        onClick={handleClose}
                        id = 'Friends'
                    >
                    <Link to="/friends" className= {classes.link}>Friends </Link> 
                    </MenuItem>
                    <MenuItem
                        onClick={handleClose}
                        id = 'Settings'
                    >
                    <Link to="/settings" className= {classes.link}>Settings </Link> 
                    </MenuItem>
                    <MenuItem
                        onClick={logout}
                        id = 'Logout'
                    >
                    Log Out
                    </MenuItem>
                </Menu>
            </Toolbar>
            
      

    </AppBar>   
  )
}

export default Header
