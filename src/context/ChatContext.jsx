import { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

function ChatProvider({ children }) {
  // Load from localStorage 
  const [chats, setChats] = useState(() => JSON.parse(localStorage.getItem('chatbot-chats')) || []);
  const [activeChatId, setActiveChatId] = useState(() => localStorage.getItem('chatbot-active-chat') || null);
  const [reasoning, setReasoning] = useState(() => JSON.parse(localStorage.getItem('chatbot-reasoning')) || false);

  //save changes
  useEffect(() => {
    localStorage.setItem('chatbot-chats', JSON.stringify(chats));
  }, [chats]);

  
  useEffect(() => {
    if (activeChatId) {
      localStorage.setItem('chatbot-active-chat', activeChatId);
    } else {
      localStorage.removeItem('chatbot-active-chat');
    }
  }, [activeChatId]);


  useEffect(() => {
    localStorage.setItem('chatbot-reasoning', JSON.stringify(reasoning));
  }, [reasoning]);

  
  useEffect(() => {
    if (chats.length === 0) {
      if (activeChatId) setActiveChatId(null);
      return;
    }
    if (!activeChatId || !chats.some(c => c.id === activeChatId)) {
      setActiveChatId(chats[0].id);
    }
  }, [chats]);

  const handleNewChat = () => {
    const newChat = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: []
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  const chatTitleRename = (id, newTitle) => {
    if (newTitle.trim() === '') return;
    setChats(prev =>
      prev.map(chat =>
        chat.id === id
          ? { ...chat, title: newTitle }
          : chat
      )
    );
  };

  const chatLogDelete = (id) => {
    setChats(prev => prev.filter(chat => chat.id !== id));
    if (id === activeChatId) {
      setActiveChatId(null);
    }
  };

  const value = {
    chats,
    activeChatId,
    reasoning,
    setChats,
    setActiveChatId,
    setReasoning,
    handleNewChat,
    chatTitleRename,
    chatLogDelete
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => useContext(ChatContext);
export default ChatProvider;
