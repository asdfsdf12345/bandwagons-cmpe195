import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from "./components/Header"
import Homepage from "./Pages/Homepage";
import PlacePage from "./Pages/PlacePage";
import { makeStyles } from '@material-ui/core/styles';

function App() {

  const useStyles = makeStyles(() => ({
    App:{
      backgroundColor: "#FFFEB7",
      color: "black",
      minHeight:"100vh",
    },
  }));

  const classes = useStyles()
  return (
    <BrowserRouter>
    <div className={classes.App}>
      <Header/>
      <Route path='/' component={Homepage} exact/>
      <Route path='/places/:id' component={PlacePage }/>
    </div>
    </BrowserRouter>
  )
}

export default App;
