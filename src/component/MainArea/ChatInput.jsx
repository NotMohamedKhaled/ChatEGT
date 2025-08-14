import { useState,useRef} from 'react'
import './ChatInput.css'   


   function ChatInput({onClick, loading , handleSetLoading,conversationContext}){

        const [input,setInput]  = useState("");
        const textareaRef = useRef(null);


        const API_KEY = import.meta.env.VITE_HG_FACE_API_KEY;
        const API_URL = import.meta.env.VITE_HG_FACE_API_URL;

        function handleChaneInput(event){
          setInput(event.target.value);
          const textarea = event.target;
          textarea.style.height = 'auto';
          textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
        }

        async function fetchDiabloRes(userInput){   
          try{
            const messages=[
              {
                role: "system",
                content: "You are a helpful chatbot. Always respond in simple, plain text. Never use markdown tables, bullet points with special characters, or complex formatting. Keep responses conversational and easy to read. Use simple dashes (-) or numbers for lists if needed."
              },
              ...conversationContext.map(m=> ({
                role: m.sender === 'user' ? 'user' : 'assistant',
                content: m.content
              })),
              {
                role: "user",
                content: userInput,
              },
            ];
            
            const response = await fetch(API_URL,{
              method: 'POST',
              headers: {
                Authorization:
                 `Bearer ${API_KEY}`,
                 'Content-Type': 'application/json',
              }, 
              body: JSON.stringify({
                model: "openai/gpt-oss-20b",
                max_tokens: 500,
                temperature: 0.7,
                messages: messages
              })
            });

          if (!response.ok) {
              const errorText = await response.text();
              console.error(`API Error ${response.status}:`, errorText);
              return "API error. Try again later.";
          }
            
          
          const data = await response.json();
          console.log("API raw response:", data)

          const botReply = data.choices[0].message || "Sorry, I didn't understand that.";

    return botReply;

          }catch(error){
             console.error("API error:", error);
            return "Oops! Something went wrong.";
          }
        }


 async function handleOnClick(){
    if(loading || input==='' ) return;

      const newChatId =await onClick(input, 'user'); // handleAddMessage
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = '44px'; // reset to base height
      textareaRef.current.blur(); 
    }

  handleSetLoading(true);
           const response= await fetchDiabloRes(input);
            await new Promise(r => setTimeout(r, 1000))
           handleSetLoading(false);
           
 await onClick(response, 'robot', newChatId);
           
        }
        function handleKeyDown(event){
          if(event.key==='Enter' && !event.shiftKey){
            event.preventDefault();
            handleOnClick();
          }else if(event.key==='Escape'){
            setInput("");
            if (textareaRef.current) textareaRef.current.style.height = '44px';
          } 

        }


        return(
          <div className="div-chat-input">
            <textarea
              className="chat-input"
              onChange={handleChaneInput} 
              onKeyDown={handleKeyDown}
              placeholder="Send a message to Chatbot" 
              value={input}
              size="30"/>
            <button className='send-button' onClick={handleOnClick}>Send</button>
          </div>

        );

  
      }
      export default ChatInput;

