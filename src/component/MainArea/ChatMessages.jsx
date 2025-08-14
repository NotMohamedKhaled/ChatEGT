import {useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import RobotImg from '../../assets/robot.png'
import LoadingImg from '../../assets/loading-spinner.gif'
import "./ChatMessages.css"

function ChatMessages({chatMessages, loading, reasoning}){
  const chatMessagesRef = useRef(null);

  useEffect(()=>{
    const containerElem = chatMessagesRef.current;
    if(containerElem){
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  },[chatMessages, loading]);

  return(
    <div ref={chatMessagesRef} className="chat-messages">
      {
        chatMessages.map(element => {
          return(
            <ChatMessage  
              message={element} 
              sender={element.sender} 
              key={element.id} 
              reasoning={reasoning} 
            />
          ); 
        })
      }
      {loading && (
        <div className="chat-message-robot">
          <img src={RobotImg} width="50" alt="Robot" />
          <img src={LoadingImg} className="loading-spinner" width="40" alt="Loading" />
        </div>
      )}
    </div>
  );
}

export default ChatMessages;