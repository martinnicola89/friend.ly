import React from 'react';
import "./DecisionPage.css"
export default class DecisionPage extends React.Component {

    state = {
        allUsers: [],
      }

    getProfile = async () => {
        let jwt = localStorage.getItem('token')
        let fetchProfileDataResponse = await fetch('/api/users/profile/decision', {headers: {'Authorization': 'Bearer ' + jwt}})
        if (!fetchProfileDataResponse.ok) throw new Error("Couldn't fetch orders")
        let profile = await fetchProfileDataResponse.json() // <------- convert fetch response into a js object
        this.setState({ allUsers: profile})
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
                {this.state.allUsers.map(u => (
                    <>
                        <div className="decisionPN">
                              <img className="userPhoto" src={u.imageUrl} /> 
                              <h1 className="userName">{u.name}</h1>
                              <div className="yes-no">
                                    <button className="no">no</button>
                                    <button className="yes">yes</button>
                              </div>
                        </div>
                        <h1 className="userBio">{u.bio}</h1>
                        <h1 className="userInterests">{u.interests}</h1>
                        <h1 className="userFriends">{u.friends}</h1>
                    </>
            ))}
            </div>
        )
    }
}