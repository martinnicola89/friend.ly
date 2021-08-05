import React from "react"
import "./ProfileData.css"
import EditProfileForm from "../EditProfileForm/EditProfileForm.jsx"

export default function ProfileData (props) {
      
      
     
      return(
            <> 
                  {props.clickedEdit ? 
                              <EditProfileForm getProfile={props.getProfile} profileData={props.profileData}/>
                              :
                              <>
                                    <div className='bioIndex'>
                                          <h2>Bio: </h2>
                                          <p>{this.props.profileData.bio}</p>
                                    </div>
                                    <div className='interestIndex'>
                                          <h2>Interests: </h2>
                                          {this.props.profileData.interests.map(i => <p>{i.label}</p>)}
                                          <p>{this.props.profileData.friends}</p> 
                                    </div>
                                          <button className="editBtn" onClick={ this.handleEdit }>Edit Profile</button>
                              </>
                        }
            </>
            )     
      
}