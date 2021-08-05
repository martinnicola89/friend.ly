// import logo from './logo.svg';
import './App.css';
import React from 'react';
import AuthPage from '../AuthPage/AuthPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import ProfilePageForm from '../../components/ProfilePageForm/ProfilePageForm';
import UserLogOut from '../../components/UserLogOut/UserLogOut';
import DecisionPage from '../DecisionPage/DecisionPage';
import EditProfileForm from '../../components/EditProfileForm/EditProfileForm'
import Messenger from '../Messenger/Messenger';
import { Link, Route, Switch, Redirect} from 'react-router-dom';
import axios from 'axios'

export default class App extends React.Component {

  state = {
    user: null,
    allUsers:[],
    addedFriend: false,
    tab: 0,
    deleted: false,
    clickedEdit: false,
  }
  toggle = (incoming) => {
  
    this.setState({
      tab: incoming,
    })
 
  }
  handleEdit = async() => {
    this.setState({
          clickedEdit: true,
    })
}

  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData})
  }


  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // decode token
      if (payload.exp < Date.now() / 1000) {  // Check if our token is expired, and remove if it is (standard/boilerplate)
        localStorage.removeItem('token');
        token = null;
      } else { // token not expired! our user is still 'logged in'. Put them into state.
        let userDoc = payload.user // grab user details from token
        console.log("userDoc", userDoc)
        this.setState({user: userDoc})      
      }
    }
  }

  getUser = async () => {
    await this.state.user
  }

  handleLogOut = () => {
    let token = localStorage.getItem('token');
    token = null;
    localStorage.removeItem('token');
    this.setState({user: null})      
  }

  handleDeleteFriend = async (userId, friendId) => {
    await axios.delete(`/api/users/${userId}/${friendId}`);
    this.setState({
      deleted: true
  });
  // window.location.reload(true);
  }

  render() {
    return (
      <div className="App">
          <nav className="nav-bar-fixed">
            <span className="nav-wrapper">
              
                  {this.state.user ?
                  <>
                  <div className="nav-bar">
                        <Link className="home" to='/'><img id="homeLogo" src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Chain_link_icon.png" /></Link>&nbsp;&nbsp;
                        <Link className="profile" to='/profile'><img id="messengerLogo" src="https://d32ogoqmya1dw8.cloudfront.net/images/serc/empty_user_icon_256.v2.png" /></Link>&nbsp;&nbsp;
                        <Link className="profile" to='/messenger'><img id="messengerLogo" src="https://static.thenounproject.com/png/1204376-200.png" /></Link>&nbsp;&nbsp;
                  </div>
                  <div className="logoutBtn">
                        <UserLogOut className="logout" handleLogOut={this.handleLogOut}/>
                  </div>
                  </>
              :
                <>
                </>
              } 
            </span>
          </nav>
        {this.state.user ?
        <Switch>
            <Route path={'/profile'} render={() => (
              <>
                <ProfilePage tab={this.state.tab} toggle={this.toggle} deleted={this.state.deleted} handleDelete={this.handleDeleteFriend} allUsers={this.state.allUsers} clickedEdit={this.state.clickedEdit} handleEdit={this.handleEdit}/>
              </>
            )}/>
            <Route path={'/profile/form'} render={(props) => (
              <>
                <ProfilePageForm {...props} getUser={this.getUser()}/>
              </>
            )}/>
            <Route path={'/profile/edit/form'} render={(props) => (
              <>
                <EditProfileForm {...props} />
              </>
            )}/>
            <Route path={'/messenger'} render={() => (
              <>
                <Messenger user={this.state.user}/>
              </>
            )}/>
            <Route path="/" render={() => (
              <>
                <DecisionPage addedFriend={this.state.addedFriend} user={this.state.user}/>
              </>
            )}/>
            <Redirect to="/profile/form" />
        </Switch> 
        :
          <AuthPage setUserInState={this.setUserInState}/>
        }
      </div>
    );
  }
}

