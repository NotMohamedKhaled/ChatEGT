import ChatLog from "./ChatLog";
function SideBarChats({ chats, onSelectChat, activeChatId, chatTitleRename,chatLogDelete}){

    return(
        <div className="chat-log-container"> 
        <p className="chat-logs-title">Chats</p>
          {chats.length === 0 && <p className="no-chats-message">No chats yet</p>}
      {chats.map(chat => (
        <div key={chat.id} onClick={() => onSelectChat(chat.id)}>
          <ChatLog
           title={chat.title}
            active={chat.id === activeChatId}
            id={chat.id}
            chatTitleRename={chatTitleRename}
            chatLogDelete={chatLogDelete} />
        </div>
      ))}
        </div>
        
    )
}
export default SideBarChats;

