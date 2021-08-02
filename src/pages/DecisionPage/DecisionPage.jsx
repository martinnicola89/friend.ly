import React from 'react';
import "./DecisionPage.css"

import { FiArrowDownCircle, FiArrowUpCircle } from 'react-icons/fi';
let arrows = { color: "lightblue", fontSize: "4em"};



export default class DecisionPage extends React.Component {

    state = {
        allUsers: [],
        isEnabled: 1,
      }


   
    getProfile = async () => {
        let jwt = localStorage.getItem('token')
        let fetchProfileDataResponse = await fetch('/api/users/profile/decision', {headers: {'Authorization': 'Bearer ' + jwt}})
        if (!fetchProfileDataResponse.ok) throw new Error("Couldn't fetch orders")
        let profile = await fetchProfileDataResponse.json() // <------- convert fetch response into a js object
        this.setState({ allUsers: profile})
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
                {this.state.allUsers.map(u => (
                  
                    <>
                    {this.state.isEnabled === 1 ?
                        <div className="decisionPN">
                              <img className="userPhoto" src={u.imageUrl} /> 
                              <h1 className="userName">{u.name}</h1>
                              <button onClick={() => this.handleClick(0)} ><FiArrowDownCircle style={arrows}/></button>
                              <div className="yes-no">
                                    <button className="no">no</button>
                                    <button className="yes">yes</button>
                              </div>
                       </div>
                        :
                              <div>
                              <h1 className="userBio">Bio:{u.bio}</h1>
                              <h1 className="userInterests">Interests:{u.interests}</h1>
                              <h1 className="userFriends">Friends:{u.friends}</h1>
                              <button onClick={() => this.handleClick(1)}><FiArrowUpCircle style={arrows}/></button>
                              </div>                  
    }
                    </>
    
            ))}
               
            </div>
        )
    }
}