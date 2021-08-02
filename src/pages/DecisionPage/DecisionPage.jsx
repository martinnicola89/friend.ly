import React from 'react';
import "./DecisionPage.css"

import { FiArrowDownCircle, FiArrowUpCircle } from 'react-icons/fi';
let arrows = { color: "lightblue", fontSize: "4em"};



export default class DecisionPage extends React.Component {

      state = {
            index: 0,
            allUsers: [],
            isEnabled: 1,
            currentProfile: {},
            likedUsers:[],
            dislikedUsers:[],
      }



      getProfile = async () => {
            let jwt = localStorage.getItem('token')
            let fetchProfileDataResponse = await fetch('/api/users/profile/decision', {headers: {'Authorization': 'Bearer ' + jwt}})
            if (!fetchProfileDataResponse.ok) throw new Error("Couldn't fetch orders")
        let profile = await fetchProfileDataResponse.json() // <------- convert fetch response into a js object
            this.setState({ allUsers: profile})
      }

      getCurrentProfile = async (index) => {
            let allUsers = await this.state.allUsers
            this.setState({ currentProfile: allUsers[index]})
      }

      handleYesSwipe = async (incomingUser) => {
            let likedUsers = this.state.likedUsers
            likedUsers.push(incomingUser)
            this.setState({ likedUsers: likedUsers})
      }

      handleNoSwipe = async (incomingUser) => {
            let dislikedUsers = this.state.dislikedUsers
            dislikedUsers.push(incomingUser)
            this.setState({ dislikedUsers: dislikedUsers})
      }

      handleClick = (incoming) => {
            this.setState({
                  isEnabled: incoming
            })
      }

async componentDidMount() {
            try {
            this.getProfile();
            } catch (err) {
                  console.error('ERROR:', err) // <-- log if error
      }
      }

    render() {
      return (
            <div className="swipe-form">
                  <>
                  {this.state.isEnabled === 1 ?
                        <div className="decisionPN">
                              <img className="userPhoto" src={this.state.currentProfile.imageUrl} /> 
                              <h1 className="userName">{this.state.currentProfile.name}</h1>
                              <button onClick={() => this.handleClick(0)} ><FiArrowDownCircle style={arrows}/></button>
                              <div className="yes-no">
                                    <button className="no">no</button>
                                    <button className="yes">yes</button>
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
                  </>
                  </div>
            )}
}