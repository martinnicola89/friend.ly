import React from 'react';
import ProfilePageForm from '../../components/ProfilePageForm/ProfilePageForm';
import ProfileData from '../../components/ProfileData/ProfileData'

export default class ProfilePage extends React.Component {
    
    state = {
        userData: {},
        profileData: null,
      }
    
      getProfile = async () => {
        let jwt = localStorage.getItem('token')
          let fetchProfileDataResponse = await fetch('/api/users/profile', {headers: {'Authorization': 'Bearer ' + jwt}})
          if (!fetchProfileDataResponse.ok) throw new Error("Couldn't fetch orders")
          let profile = await fetchProfileDataResponse.json() // <------- convert fetch response into a js object
          this.setState({ profileData: profile})
      }

      async componentDidMount() {
        try {
          let jwt = localStorage.getItem('token')
          let fetchUserDataResponse = await fetch('/api/users/userdata', {headers: {'Authorization': 'Bearer ' + jwt}})
          if (!fetchUserDataResponse.ok) throw new Error("Couldn't fetch orders")
          let userD = await fetchUserDataResponse.json() // <------- convert fetch response into a js object
          this.setState({ userData: userD})
          this.getProfile();
        } catch (err) {
          console.error('ERROR:', err) // <-- log if error
        }
      }

    render() {
        return (
            <>
                <h1>profile</h1>
                <h2>{this.state.userData.name}</h2>
                <h2>{this.state.userData.email}</h2>
                {this.state.profileData ? 
                  <ProfileData profileData={this.state.profileData}/>
                :
                <ProfilePageForm getProfile={this.getProfile}/>
                }
            </>
        )
    }
}