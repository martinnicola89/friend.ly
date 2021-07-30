import { Component } from 'react';

export default class ProfilePageForm extends Component {

  state = {
    bio: "",
    interests: "",
    friends: "",
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    }

  handleSubmit = async () => {

    try {
      let jwt = localStorage.getItem('token')
      let fetchResponse = await fetch("/api/users/profile", {
        method: "POST",
        headers: {"Content-Type": "application/json",'Authorization': 'Bearer ' + jwt},
        body: JSON.stringify({bio: this.state.bio, interests: this.state.interests, friends: this.state.friends}) // <-- send this object to server
        })
        this.props.getProfile()
    } catch (err) {
      console.error("Error:", err) // <-- log if error
    }

  }

  render() {
    return(
      <div>
        <hr />
        Bio:
        <textarea
          rows="2"
          name="bio"
          onChange={this.handleChange}
          value={this.state.bio}></textarea>
        <br />
        Interests:
        <textarea
          rows="2"
          name="interests"
          onChange={this.handleChange}
          value={this.state.interests}></textarea>
        Friends:
        <textarea
          rows="2"
          name="friends"
          onChange={this.handleChange}
          value={this.state.friends}></textarea>
        <button onClick={this.handleSubmit}>Submit!</button>
      </div>
    )
  }
}