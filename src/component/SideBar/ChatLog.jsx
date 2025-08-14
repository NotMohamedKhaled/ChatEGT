import {Ellipsis,X} from 'lucide-react'
import { useState } from 'react'
import  ChatLogOptions from './ChatLogOptions'
import RenameOption from './RenameOption';
import DeleteOption from './DeleteOption';
function ChatLog({ title, active , id,chatTitleRename,chatLogDelete}){

    const [optionsOpen,setOptionsOpen] = useState(false);
    const [renameOpen,setRenameOpen] = useState(false);
    const [deleteOpen,setDeleteOpen] = useState(false);
    
function handleOptionsSetting(){
    if(renameOpen||deleteOpen||optionsOpen){
        setDeleteOpen(false);
        setRenameOpen(false);
        setOptionsOpen(false);
    }else{
        setOptionsOpen(op=>!op)
    }
}

    return(
        <div className={`chat-log-item ${active ? "active" : ""}`}>
            <p className="chat-log-name">{title}</p>
            <button className="chat-log-options" onClick={handleOptionsSetting}>
               {optionsOpen||renameOpen||deleteOpen?
               <X size={16} color='rgb(27, 160, 27)'/>
               :<Ellipsis size={16} color='rgb(27, 160, 27)'/>} 
            </button>
            {optionsOpen && <ChatLogOptions  onOption={setOptionsOpen} onRename={setRenameOpen} onDelete={setDeleteOpen} />}
            {renameOpen && <RenameOption id={id}  onRename={setRenameOpen} chatTitleRename={chatTitleRename}/>}
            {deleteOpen && <DeleteOption id={id} onDelete={setDeleteOpen} chatLogDelete={chatLogDelete}/>}

        </div>
    )
}
export default ChatLog

