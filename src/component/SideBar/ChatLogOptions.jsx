import {Trash,FolderPen } from 'lucide-react'
import './ChatlogOptions.css'

function ChatLogOptions({onOption, onRename, onDelete}){

    const handleRename= ()=>{
        onRename(op=>!op) ;
        onOption(false);
    }
    const handleDelete= ()=>{
        onDelete(op=>!op);
        onOption(false);
    }
    
    return(
        <div className="options-dialog">
            <button className="option" onClick={handleRename}>
                <FolderPen className="icon" size={22}/>
                <p className='option-button-text'>Rename the Title</p>
            </button>

            <button className="option" onClick={handleDelete}>
                <Trash className="icon" size={22}/>
                <p className='option-button-text'>Delete Chat</p>
            </button>
        </div>

    )
}
export default ChatLogOptions;