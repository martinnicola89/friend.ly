export default function ProfileData(props) {
    return(
        <>
            <h2>{props.profileData.bio}</h2>
            <h2>{props.profileData.interests}</h2>
            <h2>{props.profileData.friends}</h2>
        </>
    )
}