
import { useThemeContext } from './context/ThemeContext.jsx';
import { useChatContext } from './context/ChatContext.jsx';
import './App.css'
import SideBar from './component/SideBar/SideBar.jsx'
import MainArea from './component/MainArea/MainArea.jsx'

function App(){
  const { theme } = useThemeContext();
  const { 
    chats, 
        setChats,           
        activeChatId, 
        setActiveChatId, 
        reasoning, 
        setReasoning,       
        handleNewChat,
        chatTitleRename,
        chatLogDelete
  } = useChatContext();

  function handleReasoning(reasoning){
    setReasoning(reasoning);
  }

 

  //title generation
  async function generateTitleForChat(messages) {
    try {
      const API_KEY = import.meta.env.VITE_HG_FACE_API_KEY;
      const API_URL = import.meta.env.VITE_HG_FACE_API_URL;
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          temperature: 0.5,
          messages: [
            {
              role: "system",
              content: "Generate a short title (3-5 words max) for this conversation. Output ONLY the FIRST title COMES TO YOUR MIND."
            },
            {
              role: "user",
              content: `Title for: ${messages.map(m => m.userMsg).join(' ')}`
            }
          ]
        })
      });

      if (!response.ok) {
        console.error(`API Error: ${response.status} - ${response.statusText}`);
        return "New Chat";
      }    

      const data = await response.json();
      console.log("Title API response:", data);  
      console.log("Title API response:", JSON.stringify(data, null, 2));

      
      let title =
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.text ||
      data?.[0]?.generated_text ||
      '';
    
    return title.trim() || 'New Chat';
      
     

    } catch (error) {
      console.error("Title generation error:", error);
      return "New Chat";
    }
  }

  //handleAddMessage / onClick in chatinput
  const handleAddMessage = async (msg, sender, chatId = activeChatId) => {
    let targetChatId = chatId;
  
    setChats(prevChats => {
      const chatsSnapshot = prevChats;
  
      // New chat
      if (!targetChatId) {
        targetChatId = crypto.randomUUID();
        const newChat = {
          id: targetChatId,
          title: "New Chat",
          messages: [{
            id: crypto.randomUUID(),
            userMsg: msg || '',
            sender
          }]
        };
  
        //title generation for fire msg
        if (sender === 'user') {
          setTimeout(async () => {
            try {
              const userOnly = newChat.messages
                .filter(m => m.sender === 'user')
                .map(m => ({ userMsg: m.userMsg }));
              const title = await generateTitleForChat(userOnly);
              if (title && title !== 'New Chat') {
                setChats(prev =>
                  prev.map(chat =>
                    chat.id === targetChatId ? { ...chat, title } : chat
                  )
                );
              }
            } catch (e) {
              console.error('Title generation error:', e);
            }
          }, 300);
        }
  
        return [newChat, ...chatsSnapshot];
      }
  
      //append message in existing chat by new chat button
      const existingChat = chatsSnapshot.find(c => c.id === targetChatId);
      const wasEmpty = (existingChat?.messages?.length ?? 0) === 0;
  
      const updatedChats = chatsSnapshot.map(chat =>
        chat.id === targetChatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: crypto.randomUUID(),
                  userMsg: msg || '',
                  content: (msg && msg.content) || '',
                  reasoning_content: (msg && msg.reasoning_content) || '',
                  sender
                }
              ]
            }
          : chat
      );
  
      // Generate title for chats by new chat button
      if (sender === 'user' && wasEmpty) {
        setTimeout(async () => {
          try {
            const userOnly = [
              ...((existingChat?.messages || [])
                .filter(m => m.sender === 'user')
                .map(m => ({ userMsg: m.userMsg }))),
              { userMsg: msg || '' }
            ];
            const title = await generateTitleForChat(userOnly);
            if (title && title !== 'New Chat') {
              setChats(prev =>
                prev.map(chat =>
                  chat.id === targetChatId ? { ...chat, title } : chat
                )
              );
            }
          } catch (e) {
            console.error('Title generation error:', e);
          }
        }, 300);
      }
  
      return updatedChats;
    });
  
    if (!chatId) setActiveChatId(targetChatId);
    return targetChatId;
  };




const activeChat = chats.find(c => c.id === activeChatId);




  return( 
    <div className={`app ${theme}`}>
      <SideBar 
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSelectChat={setActiveChatId}
        reasoning={reasoning}
        onReasoning={handleReasoning}
        chatTitleRename={chatTitleRename}
        chatLogDelete={chatLogDelete}
      />
      <MainArea 
        reasoning={reasoning}
        messages={activeChat?.messages || []}
        onAddMessage={handleAddMessage}
      />
    </div>
  );
}

export default App;
