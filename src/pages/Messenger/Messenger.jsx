import "./Messenger.css"
import Conversations from "../../components/Conversations/Conversations";
import Message from "../../components/Message/Message";
import {useRef,useEffect,useState} from "react";
import axios from "axios";
import {io} from "socket.io-client";

export default function Messenger(props) {

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(null);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const scrollRef = useRef();

    useEffect(()=>{
        socket.current = io("ws://");
        socket.current.on("get-message", data=>{
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
    },[])

    useEffect(()=>{
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages(prev=>[...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    useEffect(()=>{
        socket.current.emit("send-user", props.user?._id)
        socket.current.on("get-users", (users)=>{
            setOnlineUsers(users);
        })
    }, [props.user])

    useEffect(() => {
        const getConversations = async () => {
            try {
                let fetchConversationDataResponse = await fetch('/api/conversations/'+props.user._id)
                if (!fetchConversationDataResponse.ok) throw new Error("Couldn't fetch orders")
                let conversationsData = await fetchConversationDataResponse.json() // <------- convert fetch response into a js object
                setConversations(conversationsData);
            } catch (err) {
                console.log(err)
            }
        }
        getConversations();
    },[props.user._id])

    useEffect(() => {
        const getMessages = async () => {
            try {
                let fetchMessagesDataResponse = await fetch('/api/messages/'+currentChat?._id)
                if (!fetchMessagesDataResponse.ok) throw new Error("Couldn't fetch orders")
                let messagesData = await fetchMessagesDataResponse.json() // <------- convert fetch response into a js object
                setMessages(messagesData);
            } catch(err) {
                console.log(err)
            }
        };
        getMessages();
    }, [currentChat])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            senderId: props.user._id,
            conversationId: currentChat._id,
            text: newMessage,
        };

        const receiverId = currentChat.members.find(member=> member !== props.user._id)

        socket.current.emit("send-message", {
            'senderId': props.user._id,
            'receiverId': receiverId,
            'text': newMessage,
        })

        try {
            await axios.post("/api/messages", message);
            await setMessages([...messages, message]);
            setNewMessage("");
        } catch(err) {
            console.log(err);
        }
    };

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[messages])

    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Search for friends" className="chatMenuInput"/>
                    {conversations.map((c) => (
                        <div onClick={() => setCurrentChat(c)}>
                            <Conversations conversation={c} currentUser={props.user}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatBox"> 
                <div className="chatBoxWrapper">
                  
                        {currentChat ?
                    <>
                        <div className="chatBoxTop">
                            {messages.map((m)=>(
                                <div ref={scrollRef}>
                                    <Message message={m} own={m.senderId === props.user._id}/>
                                </div>
                            ))}
                        </div>
                        <div className="chatBoxBottom">
                            <textarea className="chatMessageInput" placeholder="Write your message here..." onChange={(e)=>setNewMessage(e.target.value)} value={newMessage}></textarea>
                            <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                        
                        </div> 
                    </> : <span className="noConvo">Start a chat</span>}
                </div>
            </div>
        </div>
    )
}
