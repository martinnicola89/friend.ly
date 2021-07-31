import React from 'react';

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
            <div>
                {this.state.allUsers.map(u => (
                    <>
                        <h1>{u.name}</h1>
                        <img src={u.imageUrl} /> 
                        <h1>{u.bio}</h1>
                        <h1>{u.interests}</h1>
                        <h1>{u.friends}</h1>
                    </>
            ))}
            </div>
        )
    }
}