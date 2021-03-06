import { IconButton, Menu, MenuItem, AppBar, Container, Toolbar, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import LoginModal from '../Authetication/LoginModal';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    title:{
      flex: 1,
      fontWeight: "bold",
      cursor: "pointer",
      marginLeft: 0, 
    },

    

}))

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClose = () => {
        setAnchorEl(null)
    }
 
    const openMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const history = useHistory();

    const classes=useStyles();

  return (
    <AppBar color='transparent' position='static' >
        
            <Toolbar>
                <Typography onClick={() => history.push('/')} className={classes.title}>
                    Bandwagons
                </Typography>
                <LoginModal/>
                <IconButton 
                color="default"
                onClick={(openMenu)}
                style={{ width: 0, height: 40, MarginRight: 30 }}
                >
                    <ArrowDropDownIcon/>
                </IconButton>
                <Menu
                    id='navMenu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    
                >
                    <MenuItem
                        onClick={handleClose}
                        id = 'Profile'
                    >
                    Profile
                    </MenuItem>
                    <MenuItem
                        onClick={handleClose}
                        id = 'Events'
                    >
                    Events
                    </MenuItem>
                    <MenuItem
                        onClick={handleClose}
                        id = 'Friends'
                    >
                    Friends
                    </MenuItem>
                    <MenuItem
                        onClick={handleClose}
                        id = 'Settings'
                    >
                    Settings
                    </MenuItem>
                    <MenuItem
                        onClick={handleClose}
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
