import { Component } from 'react';
import './SignUpForm.css'

export default class SignUpForm extends Component {
  
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: '',
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
        console.log("In sign up handle submit try")
        // 1. POST our new user info to the server
        const fetchResponse = await fetch('/api/users/signup', {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({name: this.state.name, email: this.state.email, password: this.state.password,})
        })
        
        // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
        if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')
        
        let token = await fetchResponse.json() // 3. decode fetch response to get jwt from srv
        console.log("token in sign up form is", token)
        localStorage.setItem('token', token);  // 4. Stick token into localStorage
        
        const userDoc = JSON.parse(atob(token.split('.')[1])).user; // 5. Decode the token + put user document into state
        this.props.setUserInState(userDoc)
  
      } catch (err) {
      console.log("SignupForm error", err)
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  }

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <div className="form-container">
          <form className="signup-form" autoComplete="off" onSubmit={this.handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} required /><br/>
            <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required /><br/>
            <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required /><br/>
            <input type="password" name="confirm" placeholder="Confirm" value={this.state.confirm} onChange={this.handleChange} required /><br/>
            <button className="sign-up" type="submit" disabled={disable}>SIGN UP</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}
