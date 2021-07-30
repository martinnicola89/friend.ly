// import logo from './logo.svg';
import './App.css';
import React from 'react';
import AuthPage from '../AuthPage/AuthPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import ProfilePageForm from '../../components/ProfilePageForm/ProfilePageForm';
import UserLogOut from '../../components/UserLogOut/UserLogOut';
import { Link, Route, Switch, Redirect} from 'react-router-dom';

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

  handleLogOut = () => {
    let token = localStorage.getItem('token');
    console.log("token in handle log out", token)
    token = null;
    localStorage.removeItem('token');
    this.setState({user: null})      
  }

  render() {
    return (
      <div className="App">
          <nav>
            <span>
              <Link to='/'>Home</Link>&nbsp;&nbsp;
              <Link to='/profile'>Profile</Link>&nbsp;&nbsp;
            </span>
          </nav>
        {this.state.user ?
        <Switch>
            <Route path={'/profile'} render={() => (
              <>
                <ProfilePage />
                <UserLogOut handleLogOut={this.handleLogOut}/>
              </>
            )}/>
            <Route path={'/profile/form'} render={() => (
              <>
                <ProfilePageForm />
                <UserLogOut handleLogOut={this.handleLogOut}/>
              </>
            )}/>
            <Route path="/" render={() => (
              <>
                <h1>Hello</h1>
                <UserLogOut handleLogOut={this.handleLogOut}/>
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

