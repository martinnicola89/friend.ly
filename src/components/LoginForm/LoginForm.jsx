import { Component } from 'react';
import './LoginForm.css'

export default class LoginForm extends Component {
  
  state = {
    email: '',
    password: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
        // 1. POST our new user info to the server
        const fetchResponse = await fetch('/api/users/login', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: this.state.email, password: this.state.password, })
        })
  
        // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
        if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')
  
        let token = await fetchResponse.json() // 3. decode fetch response: get jwt token from srv
        localStorage.setItem('token', token);  // 4. Stick token into localStorage
  
        const userDoc = JSON.parse(atob(token.split('.')[1])).user; // 5. Decode the token + put user document into state
        console.log("userDoc in userDoc", userDoc)
        this.props.setUserInState(userDoc)
  
      } catch (err) {
      console.log("SignupForm error", err)
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  }

  render() {
    return (
      <div >
        <div className="form-container" onSubmit={this.handleSubmit}>
          <form className='loginForm' autoComplete="off" >
            <input className="user-box" type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} required /><br/>
            <input className="user-box" type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} required /><br/>
            <button className="log-in" type="submit">LOG IN</button><br/>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}