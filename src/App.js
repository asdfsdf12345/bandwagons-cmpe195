import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from "./components/Header"
import Homepage from "./Pages/Homepage";
import PlacePage from "./Pages/PlacePage";
import SettingsPage from './Pages/SettingsPage';
import ProfilePage from './Pages/ProfilePage';
import FriendsPage from './Pages/FriendsPage';
import EventsPage from './Pages/EventsPage';
import GroupsPage from './Pages/GroupsPage';
import FinderPage from './Pages/FinderPage';
import { makeStyles } from '@material-ui/core/styles';
import Alert from './components/Alert';
import GroupMessagePage from './Pages/GroupMessagePage';
import FriendMessagePage from './Pages/FriendMessagePage';

function App() {

  
  const useStyles = makeStyles(() => ({
    App:{
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
      <Route path='/places/:pid' component={PlacePage }/>
      <Route path='/settings' component={SettingsPage }/>
      <Route path='/profile' component={ProfilePage }/>
      <Route path='/friends' component={FriendsPage } exact/>
      <Route path='/friends/:fid' component={FriendMessagePage}/>
      <Route path='/events' component={EventsPage }/>
      <Route path='/groups' component={GroupsPage } exact/>
      <Route path='/finder' component={FinderPage }/>
      <Route path='/groups/:gid' component={GroupMessagePage} />
    </div>
    <Alert/>
    </BrowserRouter>
  )
}

export default App;
