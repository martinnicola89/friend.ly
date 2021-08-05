import React from 'react';
import "./DecisionPage.css"
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import axios from 'axios';
let arrows = { color: "#f3c98b", fontSize: "4em", borderRadius: "50px"};
export default class DecisionPage extends React.Component {
    state = {
        currentUser: {},
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
      let profile = await fetchProfileDataResponse.json() 
      let fetchUserDataResponse = await fetch('/api/users/userdata', {headers: {'Authorization': 'Bearer ' + jwt}})
      if (!fetchUserDataResponse.ok) throw new Error("Couldn't fetch orders")
      let user = await fetchUserDataResponse.json()
      let userFriends = user.friends;
      console.log("User Friends", userFriends);
      this.setState({ likedUsers: userFriends, currentUser: user })
      let friendIds = []
      for (let u of userFriends) {
        friendIds.push(u._id);
      }
      let arr = profile.filter(p => !friendIds.includes(p._id))
      this.setState({ allUsers: arr})
    }
    handleConversationStarter = async (incoming_friend_id, incoming_user_id) => {
      let members = {'senderId': incoming_user_id, 'receiverId': incoming_friend_id}
      return axios.post('/api/conversations', members)
    }
    getCurrentProfile = (index) => {
      let allUsers = this.state.allUsers;
      let currentProfile = allUsers[index]
      this.setState({currentProfile: currentProfile})
    } 
    handleYesSwipe = (incomingUser) => {
      let allUsers = this.state.allUsers;
      allUsers = allUsers.splice(this.state.index, 1)
      let likedUsers = this.state.likedUsers;
      likedUsers.push(incomingUser)
      let currentIndex = this.state.index;
      this.getCurrentProfile(currentIndex)
      this.handleConversationStarter(incomingUser.user, this.state.currentUser._id)
      this.setState({likedUsers: likedUsers, index: currentIndex})
      return axios.post(`/api/users/${this.props.user._id}`, this.state.likedUsers)
    } 
    handleNoSwipe = (incomingUser) => {
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
                                 <img className="arrowBtnDown" src="https://peakmind.in/corporate/images/source.gif" onClick={() => this.handleClick(0)}/>
                                  <div className="yes-no">
                                        <button className="no" onClick={()=>this.handleNoSwipe(this.state.currentProfile)}>NO</button>
                                        <button className="yes" onClick={()=>this.handleYesSwipe(this.state.currentProfile)}>YES</button>
                                  </div>
                          </div>
                           :
                                  <div>
                                          <div className="bioWrapper">
                                                <h3 className="userBio">Bio:</h3><p>{this.state.currentProfile.bio}</p>
                                          </div>
                                    <h1 className="userInterests">Interests:{this.state.currentProfile.interests.map(i => <button className="interestList">{i.label}</button>)}</h1>
                                      <img className="arrowBtnUp" src="https://peakmind.in/corporate/images/source.gif" onClick={() => this.handleClick(1)}/>
                                  </div>                  
    }
                    </div>
                  }
            </div>
        )
    }
}