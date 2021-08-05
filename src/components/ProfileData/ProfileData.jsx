import React from "react"
import "./ProfileData.css"
import EditProfileForm from "../EditProfileForm/EditProfileForm.jsx"

export default function ProfileData (props) {
      
      
     
      return(
            <> 
                  {props.clickedEdit ? 
                        <div className="editProfileForm">
                              <EditProfileForm handleEdit={props.handleEdit} getProfile={props.getProfile} profileData={props.profileData}/>
                        </div>
                              :
                              <>
                                    <div className='bioIndex'>
                                          <h2>Bio: </h2>
                                          <p className="bioBlock">{props.profileData.bio}</p>
                                    </div>
                                    <div className='interestIndex'>
                                          <h2>Interests: </h2>
                                          {props.profileData.interests.map(i => <p>{i.label}</p>)}
                                          <p>{props.profileData.friends}</p> 
                                    </div>
                                          <button className="editBtn" onClick={ ()=>props.handleEdit(true) }>Edit Profile</button>
                              </>
                        }
            </>
            )     
      
}
