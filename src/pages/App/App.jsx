// import logo from './logo.svg';
import './App.css';
import React from 'react';
import AuthPage from '../AuthPage/AuthPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import ProfilePageForm from '../../components/ProfilePageForm/ProfilePageForm';
import UserLogOut from '../../components/UserLogOut/UserLogOut';
import DecisionPage from '../DecisionPage/DecisionPage';
import Messenger from '../Messenger/Messenger';
import { Link, Route, Switch} from 'react-router-dom';

export default class App extends React.Component {

  state = {
    user: null,
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

  render() {
    return (
      <div className="App">
          <nav className="nav-bar-fixed">
            <span className="nav-wrapper">
              
                  {this.state.user ?
                  <>
                  <div className="nav-bar">
                        <Link className="home" to='/'>Home</Link>&nbsp;&nbsp;
                        <Link className="profile" to='/profile'>Profile</Link>&nbsp;&nbsp;
                        <Link className="profile" to='/messenger'>Messenger</Link>&nbsp;&nbsp;
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
                <ProfilePage />
              </>
            )}/>
            <Route path={'/profile/form'} render={(props) => (
              <>
                <ProfilePageForm {...props} getUser={this.getUser()}/>
              </>
            )}/>
            <Route path={'/messenger'} render={() => (
              <>
                <Messenger user={this.state.user}/>
              </>
            )}/>
            <Route path="/" render={() => (
              <>
                <DecisionPage user={this.state.user}/>
              </>
            )}/>
        </Switch> 
        :
          <AuthPage setUserInState={this.setUserInState}/>
        }
      </div>
    );
  }
}

