export default function ProfileData(props) {
    return(
        <>
            <img src={`${props.profileData.imageUrl}?${new Date()}`} key={new Date().getTime()} />
            <h2>{props.profileData.bio}</h2>
            <h2>{props.profileData.interests}</h2>
            <h2>{props.profileData.friends}</h2>
        </>
    )
}