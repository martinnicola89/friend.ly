import './ChatOnline.css'
import {useState} from 'react';

export default function ChatOnline({onlineUsers, currentId, setCurrentChat}) {

    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src="https://www.makeup.com/-/media/project/loreal/brand-sites/mdc/americas/us/articles/2018/september/11-ultimate-makeup/the-ultimate-makeup-tutorial-eyeshadow-lipstick-face-hero-mudc-091118_r2.jpg" alt="" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">Online Friend</span>
            </div>
        </div>
    )
}    