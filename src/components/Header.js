import React from 'react'
import{ AppBar, Container, Toolbar, Typography} from "@material-ui/core";


const classes = useStyles();


const Header = () => {
  return (
    <AppBar color='transparent' position='static'>
      <Container>
        <Toolbar>
          <Typography> Bandwagons </Typography>
        </Toolbar>
      </Container>
    </AppBar>

  )
    
  
};

export default Header
