# **ChatEGT — React Chatbot**  

A responsive chat app built with **React.js** + **Vite**.  
It supports multiple chats, auto-generated titles, localStorage persistence, **Show Reasoning** mode, and a mobile-friendly UI with an off-canvas sidebar.  

Used the API of **openai/gpt-oss-20b** AI Model for generating chatbot responses and coming up with a related title for the chat log.  

---

## **Features**  

- **Multi chat sessions** — Create, select, rename, and delete chat logs.  
- **AI responses** — Sends conversation context to the API and renders assistant replies.  
- **Auto title generation** — First user message triggers a concise chat title via API.  
- **Reasoning toggle** — Optionally show assistant “reasoning” text before replies.  
- **Local persistence** — Chats, active chat, reasoning mode, and theme saved in localStorage.  
- **Responsive UI** — Sidebar collapses into a rail at ≤1200px and slides over content when expanded.  
- **Markdown rendering** — Assistant messages support basic Markdown via react-markdown.  
- **Theme** — Light/Dark mode.  

---

## **Tech Stack**  

- **Frontend:** React, Vite
- **AI Model:** openai/gpt-oss-20b  
- **State:** React Context API  
- **Styling:** CSS Modules  
- **Icons:** lucide-react  
- **Markdown:** react-markdown  
- **Persistence:** localStorage  

---

## **Student Principles Applied**  

- **Fetching from API** — Fetching from a real AI model API.  
- **Single source of truth** — Centralized chat state in ChatContext.  
- **Separation of concerns** — State logic in context, API orchestration in App.jsx.  
- **Functional state updates** — Avoid stale closures when updating nested arrays.  
- **Persistence** — localStorage hydration.  
- **Handling side-effects** — Real usage and application of useEffect.  

 
