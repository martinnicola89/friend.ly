import "./ProfileData.css"

export default function ProfileData(props) {
    return(
        <>
            <h2>Bio: </h2>
            <p>{props.profileData.bio}</p>
            <h2>Interests: </h2>
            {props.profileData.interests.map(i => <p>{i.label}</p>)}
            <p>{props.profileData.friends}</p>            
        </>
    )
}