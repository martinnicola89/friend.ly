import { useState, useEffect } from 'react'
import './Conversations.css'

export default function Conversation({conversation, currentUser}) {
    const [user, setUser] = useState({});
    const [img, setImg] = useState(null);
    useEffect(() => {
        const getUser = async () => {
            try {
                const friendId = conversation.members.find((m) => m !== currentUser._id)
                let fetchFriendDataResponse = await fetch('/api/users/userdata/'+friendId)
                if (!fetchFriendDataResponse.ok) throw new Error("Couldn't fetch orders")
                let friendData = await fetchFriendDataResponse.json() // <------- convert fetch response into a js object

                let fetchImgDataResponse = await fetch('/api/users/profile/'+friendId)
                if (!fetchImgDataResponse.ok) throw new Error("Couldn't fetch orders")
                let imgData = await fetchImgDataResponse.json() // <------- convert fetch response into a js object

                setUser(friendData);
                setImg(imgData)
            } catch (err) {
                console.log(err);
            }
        }
        getUser();
    }, [currentUser, conversation])

    return (
        <div className="conversation">
            <img className="conversationImg" src={img} alt="" />
            <span className="conversationName">{user.name}</span>
        </div>
    )
}