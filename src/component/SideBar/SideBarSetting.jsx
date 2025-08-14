    // import { useState } from "react";
import { useThemeContext } from "../../context/ThemeContext";
import { Sun, Moon,Brain, CirclePlus} from 'lucide-react';

function SideBarSetting({ onNewChat, reasoning, onReasoning }){
const {theme,handleTheme} = useThemeContext();

function handleReasoningClick(){
    onReasoning(!reasoning);  
  }


    return(
        <div className="side-bar-setting">
            <button className="setting-button"  onClick={onNewChat}>
                <CirclePlus className="icon" color="rgba(5, 190, 5, 1)" size={22}/>              
                <p>New Chat</p>
                </button>
            <button className="setting-button" onClick={handleReasoningClick}>
                 <Brain className="icon" size={22}/>
                {reasoning? <p>Reasoning Off</p>:<p> Reasoning On</p>}
            </button>
            <button className="setting-button" onClick={handleTheme}>
                {theme === 'light' ? <Moon className="icon"  fill={"var(--accent-color)"} size={22} /> : <Sun className="icon"  size={22} />}
                {theme === 'light' ? <p>Dark Mode</p> : <p>Light Mode</p>}    
            </button>
        </div>
    );
}
export default SideBarSetting;