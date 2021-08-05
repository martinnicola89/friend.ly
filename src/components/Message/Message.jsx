import "./Message.css"
import moment from 'moment'

export default function Message({message, own}) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{moment(message.createdAt).fromNow()}</div>
        </div>
    )
}