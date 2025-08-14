import RobotImg from '../../assets/robot.png'
import UserImg from '../../assets/user.png'
import ReactMarkdown from 'react-markdown';
import './ChatMessage.css'

 function ChatMessage({message,sender,reasoning}){
 
        if(sender==="robot"){ 

          return(
              <div className="chat-message-robot">
               <img src={RobotImg}  width="50"/>
               <div className='div-robot-text'>
                 {reasoning && (
                  <p className='chat-reasoning-text'>
                    {message.reasoning_content}
                  </p>
                )}
              <div className="chat-message-text" ><ReactMarkdown>{message.content}</ReactMarkdown></div>
              </div>
               
               
              </div>
          );
        }else if(sender ==="user"){
          return(
              <div className="chat-message-user">
                 <p className="chat-message-text">{message.userMsg}</p>
                <img src={UserImg}  width="50"/>
              </div>
          );
        }
 
       
      }
      export default ChatMessage;
