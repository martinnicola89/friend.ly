
import Select from 'react-select';
import React from 'react';
import './EditProfileForm.css'

const interests = [
  { label: "Cars", value: 1 },
  { label: "Shoes", value: 2 },
  { label: "Food", value: 3},
  { label: "Netflix", value: 4 },
  { label: "Amazon", value: 5 },
  { label: "Coding", value: 6 },
];

export default class ProfilePageForm extends React.Component {

  state = {
      profileData: this.props.profileData,
      editedP: true,
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
      await fetch("/api/users/profile/"+this.props.profileData._id+"/edit", {
        method: "POST",
        headers: {"Content-Type": "application/json",'Authorization': 'Bearer ' + jwt},
        body: JSON.stringify({bio: this.state.bio, interests: this.state.interests}) // <-- send this object to server
        })
        this.props.getProfile()
        // window.location.reload(true);
    } catch (err) {
      console.error("Error:", err) // <-- log if error
    }
  }

  async componentDidMount() {
      try {
        this.props.getProfile();        
      } catch (err) {
        console.error('ERROR:', err) // <-- log if error
      }
  }

  render() {
    return(
      <div className="profileForm">
        <hr />
        Bio:
        <textarea
            className="bioArea"
            rows="5"
            cols="53"
            name="bio"
            onChange={this.handleChange}
            placeholder={this.state.profileData.bio}></textarea>
        <br />
        Interests:
        <Select name= "interests" placeholder={this.state.profileData.interests.map(i => <li>{i.label}</li>)}onChange={this.handleSelect} options={ interests } isMulti />
        
        <button className="submitFormBtn" onClick={this.handleSubmit}>Submit!</button>
      </div>
    )
  }
}