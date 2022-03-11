import React from 'react'
import{ AppBar, Container, Toolbar, Typography} from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(()=>({
  title:{
    flex: 1,
    color: "black",
    cursor: "pointer",
  },
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  
  return (
    <AppBar color='transparent' position='static'>
      <Container>
        <Toolbar>
          <Typography 
          onClick={()=> history.push("/")}
          className={classes.title}
          > 
            
            Bandwagons 
            </Typography>
        </Toolbar>
      </Container>
    </AppBar>

  )
    
  
};

export default Header
