import './App.css';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {useEffect, useState} from "react"
const client = new W3CWebSocket('ws://192.168.1.20:8000');



function App() {
  // componentWillMount() {
  //   client.onopen = () => {
  //     console.log('WebSocket Client Connected');
  //   };
  //   client.onmessage = (message) => {
  //     console.log(message);
  //   };
  // }

  const [message, setMessage] = useState(undefined)
  const [messages, setMessages] = useState([]);


  useEffect(function(){
    client.onopen = ()=>{
      console.log("Websocket client connected")
    };
    client.onmessage = (message)=>{
      setMessages(messages => [...messages, message.data])
    };
  }, [])

  

  function handleTextAreaChange(e){
    setMessage(e.target.value)
  }

//   logInUser = () => {
//     const username = this.username.value;
//     if (username.trim()) {
//         const data = {
//             username
//         };
//         this.setState({
//             ...data
//         }, () => {
//             client.send(JSON.stringify({
//                 ...data,
//                 type: "userevent"
//             }));
//         });
//     }
// }
  function sendMessage(e){
    e.preventDefault();
    client.send(JSON.stringify({message, type: "userevent"}))
    setMessage("")
  }

  return (
    <div className="chatting">
      <div className="msg-history">
        {/* {JSON.stringify(messages)} */}
        {messages.map(function(msg, index){
          return <div className='msg' key={index}>{msg}</div>
        })}
      </div>
      <div className="text-box">
        <form>
        <input
          type="text"
          value={message}
          onChange={handleTextAreaChange}
          placeholder="type your message here..."/
        >
        <button onClick={sendMessage}>
          Send
        </button>
        </form>
        
      </div>
    </div>
  );
}

export default App;
