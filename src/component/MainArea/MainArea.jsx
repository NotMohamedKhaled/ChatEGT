import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { useState } from "react";
import './MainArea.css'

function MainArea({ messages, onAddMessage, reasoning }){
    const [loading,setLoading]  = useState(false);


function handleSetLoading(isLoading){
    setLoading(isLoading);        
}

      return (
    <div className="main-area">
      {messages.length === 0 ? (
        <div className="welcome-message">Welcome to ChatBot! Start Chatting Now.</div>
      ) : (
        <ChatMessages reasoning={reasoning} chatMessages={messages} loading={loading} />
      )}
      <ChatInput
        onClick={onAddMessage}
        loading={loading}
        handleSetLoading={handleSetLoading}
        conversationContext={messages} 
        />
    </div>
  );
}
export default MainArea

