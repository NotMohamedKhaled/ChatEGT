import SideBarChats from './SideBarChats'
import SideBarSetting from './SideBarSetting'
import './SideBar.css'
import {PanelRightClose, PanelRightOpen} from 'lucide-react'
import { useEffect, useState } from 'react'

function SideBar({ chats, activeChatId, onNewChat, onSelectChat, reasoning, onReasoning,chatTitleRename,chatLogDelete }){
    const [sideBarState,setSideBarState] = useState(true);
    const [isNarrow, setIsNarrow] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 1200 : false);


    useEffect(() => {
        function handleResize(){
            setIsNarrow(window.innerWidth <= 1200);
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    // Auto-collapse on small screens, auto-expand on large screens
    useEffect(() => {
        setSideBarState(!isNarrow);
    }, [isNarrow]);

    function handleSideState(){
        setSideBarState(prev => !prev);
    }

	return(
		<>
        <div className={`side-bar ${sideBarState ? '' : 'collapsed'}`}>
            <div className='title-extend-colapse'>
                <p className="side-bar-title">ChatEGT</p>
                <button className='extend-colapse' onClick={handleSideState}>
                {sideBarState?
                <PanelRightOpen color='var(--accent-color)' size={28}  />
                :<PanelRightClose color='var(--accent-color)' size={28}/> }
                </button>
            </div>
            <SideBarSetting reasoning={reasoning} onReasoning={onReasoning} onNewChat={onNewChat}/>
        
        {sideBarState && (
            <SideBarChats
              chats={chats}
              activeChatId={activeChatId}
              onSelectChat={onSelectChat}
              chatTitleRename={chatTitleRename}
              chatLogDelete={chatLogDelete}/>
        )}
    
		</div>
        
        {isNarrow && sideBarState && <div className="sidebar-overlay" onClick={handleSideState} />}
		</>
    );
}
export default SideBar

