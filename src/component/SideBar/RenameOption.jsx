import { useState } from "react";
import {X} from 'lucide-react'
function RenameOption({id,onRename,chatTitleRename}){
    const [input,setInput]=useState('')
    
    function handleOnChnage(e){
        if(e.target.value.trim() ==='') return;
        setInput(e.target.value)
    }
    function handleOnClick(){
        chatTitleRename(id,input);
        onRename(op=>!op);

    }
    
    
    return(
        <div className="rename-dialog">
            <p>Enter a new Title</p>
            <input type="text" value={input} placeholder="Enter New Title" onChange={handleOnChnage} />
            <div className="buttons">
            <button className="new-title-btn" onClick={handleOnClick}> Save</button>
            <button className="new-title-cancel" onClick={()=>onRename(op=>!op)}>
                <X className="cancel-icon" size={20} color='white'  />
            </button>
            </div>
            
        </div>
    );
}
export default RenameOption;