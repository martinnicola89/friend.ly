import React from 'react';
import "./DecisionPage.css"
import { FiArrowDownCircle, FiArrowUpCircle } from 'react-icons/fi';
import axios from 'axios';

let arrows = { color: "lightblue", fontSize: "4em"};

export default class DecisionPage extends React.Component {

    state = {
        allUsers: [],
        isEnabled: 1,
        currentProfile: {},
        likedUsers: [],
        dislikedUsers: [],
        index: 0,
      }
   
    getProfile = async () => {
      let jwt = localStorage.getItem('token')
      let fetchProfileDataResponse = await fetch('/api/users/profile/decision', {headers: {'Authorization': 'Bearer ' + jwt}})
      if (!fetchProfileDataResponse.ok) throw new Error("Couldn't fetch orders")
      let profile = await fetchProfileDataResponse.json() // <------- convert fetch response into a js object
      this.setState({ allUsers: profile })
    }

    getCurrentProfile = (index) => {
      let allUsers = this.state.allUsers;
      this.setState({currentProfile: allUsers[index]})
    } 

    handleYesSwipe = async (incomingUser) => {
      let allUsers = this.state.allUsers;
      allUsers = allUsers.splice(this.state.index, 1)
      let likedUsers = this.state.likedUsers;
      likedUsers.push(incomingUser)
      let currentIndex = this.state.index;
      this.getCurrentProfile(currentIndex)
      this.setState({likedUsers: likedUsers, index: currentIndex})
    } 

    handleNoSwipe = async (incomingUser) => {
      let dislikedUsers = this.state.dislikedUsers;
      dislikedUsers.push(incomingUser)
      let currentIndex = this.state.index;
      currentIndex += 1;
      this.getCurrentProfile(currentIndex)
      this.setState({dislikedUsers: dislikedUsers, index: currentIndex})
    }

      handleClick = (incoming) => {
        this.setState({
            isEnabled: incoming
        })
      }

   async componentDidMount() {
        try {
         await this.getProfile();
         this.getCurrentProfile(this.state.index);
        } catch (err) {
          console.error('ERROR:', err) // <-- log if error
        }
      }

  async componentWillUnmount() {
    return axios.post(`/api/users/${this.props.user._id}`, this.state.likedUsers)
  }

    render() {
        return (
            <div className="swipe-form">
                  {this.state.index >= this.state.allUsers.length ?
                      <h1>No More Profiles To Show</h1>
                      :
                    <div className="swipe1">

                        {this.state.isEnabled === 1 ?
                            <div className="decisionPN">
                                  <img className="userPhoto" src={this.state.currentProfile.imageUrl} /> 
                                  <h1 className="userName">{this.state.currentProfile.name}</h1>
                                  <button onClick={() => this.handleClick(0)} ><FiArrowDownCircle style={arrows}/></button>
                                  <div className="yes-no">
                                        <button className="no" onClick={()=>this.handleNoSwipe(this.state.currentProfile)}>no</button>
                                        <button className="yes" onClick={()=>this.handleYesSwipe(this.state.currentProfile)}>yes</button>
                                  </div>
                          </div>
                            :
                                  <div>
                                    <h1 className="userBio">Bio:{this.state.currentProfile.bio}</h1>
                                    <h1 className="userInterests">Interests:{this.state.currentProfile.interests}</h1>
                                    <h1 className="userFriends">Friends:{this.state.currentProfile.friends}</h1>
                                    <button onClick={() => this.handleClick(1)}><FiArrowUpCircle style={arrows}/></button>
                                  </div>                  
                        }
                    </div>
                  }
            </div>
        )
    }
}