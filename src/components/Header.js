import { IconButton, Menu, MenuItem, AppBar, Container, Toolbar, Typography, makeStyles, Avatar } from '@material-ui/core'
import React from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import LoginModal from '../Authetication/LoginModal';
import { Link, useHistory } from 'react-router-dom';
import NavigationContext, { NavigationState } from '../NavigationContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import SearchIcon from '@material-ui/icons/Search';
import { wait } from '@testing-library/user-event/dist/utils';

const useStyles = makeStyles(() => ({
    title:{
      flex: 1,
      fontWeight: "bold",
      cursor: "pointer",
      marginLeft: 0, 
    },

    Explore:{
        flex: 1,
        fontWeight: "bold",
        cursor: "pointer",
        display: "block",
        marginLeft: "auto", 
        marginRight:300,
        fontSize: 30
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

    const {user, setAlert, photo} = NavigationState();

    const history = useHistory();

    const classes=useStyles();

    const logout = () => {
        
        signOut(auth);

        setAlert({
            open:true,
            message: "Logout Successful",
        });
        
        handleClose();
        history.push('/');

        wait(300);
        window.location.reload(true);
        wait(200);
    }

  return (
    <AppBar color ='transparent'  position='static' className={classes.appbar}>
        
        
            <Toolbar>
                <Typography onClick={() => history.push('/')} className={classes.title}>
                    Bandwagons
                </Typography>
                <SearchIcon style={{width:40, height:40,}}></SearchIcon>
                <Typography onClick={() => history.push('/finder')} className={classes.Explore}>
                      Explore BandWagons
                </Typography>
                
                {user ? 
                <div>
                <Avatar style={{float:"left"}} src={photo}></Avatar>
                <IconButton 
                color="default"
                onClick={(openMenu)}
                style={{ width: 0, height: 40, MarginRight: 30 }}
                >
                    <ArrowDropDownIcon/>
                </IconButton></div> : <LoginModal/> }
                    
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
                        id = 'Friends'
                    >
                    <Link to="/friends" className= {classes.link}>Friends </Link> 
                    </MenuItem>
                    <MenuItem
                        onClick={handleClose}
                        id = 'Groups'
                    >
                    <Link to="/groups" className= {classes.link}>Groups </Link> 
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
