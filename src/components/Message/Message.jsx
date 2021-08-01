import "./Message.css"
import moment from 'moment'

export default function Message({message, own}) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg" src="https://www.makeup.com/-/media/project/loreal/brand-sites/mdc/americas/us/articles/2018/september/11-ultimate-makeup/the-ultimate-makeup-tutorial-eyeshadow-lipstick-face-hero-mudc-091118_r2.jpg" alt="" />
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{moment(message.createdAt).fromNow()}</div>
        </div>
    )
}