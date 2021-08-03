import "./ProfileData.css"

export default function ProfileData(props) {
    return(
        <>
            <h2>Bio: {props.profileData.bio}</h2>
            <h2>Interests: {props.profileData.interests.map(i => <p>{i.label}</p>)}</h2>
            <h2>{props.profileData.friends}</h2>
        </>
    )
}