import { Component } from 'react';
import "./ProfilePageForm.css"
import Select from 'react-select';

const interests = [
  { label: "Cars", value: 1 },
  { label: "Shoes", value: 2 },
  { label: "Food", value: 3},
  { label: "Netflix", value: 4 },
  { label: "Amazon", value: 5 },
  { label: "Coding", value: 6 },
];

export default class ProfilePageForm extends Component {

  state = {
    user: this.props.user,
    bio: "",
    interests: [],
    pictures: "",
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    }

  handleSelect = (incomingInterest) => {
    let interests = this.state.interests
    incomingInterest.map(i => i.label)
    interests.push(incomingInterest[incomingInterest.length-1])
    console.log("incoming interest", incomingInterest[incomingInterest.length-1])
    interests.flat(Infinity)
    console.log('interests', interests)
    this.setState({interests: interests})
  }

  handleSubmit = async () => {
    try {
      let jwt = localStorage.getItem('token')
      await fetch("/api/users/profile", {
        method: "POST",
        headers: {"Content-Type": "application/json",'Authorization': 'Bearer ' + jwt},
        body: JSON.stringify({bio: this.state.bio, interests: this.state.interests, imageUrl: this.state.pictures[1]}) // <-- send this object to server
        })
        this.props.getProfile()
    } catch (err) {
      console.error("Error:", err) // <-- log if error
    }
  }

  render() {
    return(
      <div className="profileForm">
        <hr />
        <h2 className="title-name">Update bio</h2>
        <textarea
            placeholder="BIO"
            rows="5"
            cols="53"
            name='bio'
            className="bio"
            onChange={this.handleChange}
            value={this.state.bio}></textarea>
        <br />
        Interests:
        <Select name= "interests" onChange={this.handleSelect} options={ interests } isMulti />
        
        <button className="submitFormBtn" onClick={this.handleSubmit}>Submit!</button>
      </div>
    )
  }
}