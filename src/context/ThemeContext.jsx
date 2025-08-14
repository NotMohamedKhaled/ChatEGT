import { useState, createContext, useContext, useEffect } from "react";

const ThemeContext = createContext();

function ThemeProvider({children}){
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('chatbot-theme');
    return saved || 'light';
  });  
  useEffect(()=>{
    localStorage.setItem('chatbot-theme', theme);
  },[theme])

  function handleTheme(){
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));  // Toggle between 'light' and 'dark'
  }         
    
  return(
    <ThemeContext.Provider value={{theme, handleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);
export default ThemeProvider;

