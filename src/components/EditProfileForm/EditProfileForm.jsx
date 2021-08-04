import { Component } from 'react';
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
      bio: "",
      interests: [],
      profileData: this.props.profileData,
      editedP: false,
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
        await this.setState({ editedP: true })
        this.props.getProfile()
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
          rows="2"
          name="bio"
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