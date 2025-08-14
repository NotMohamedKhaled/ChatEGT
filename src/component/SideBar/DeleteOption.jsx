
function DeleteOption({id,onDelete,chatLogDelete}){
    
    function handleOnDelete(){
        chatLogDelete(id);
    }

    
    
    return(
        <div className="delete-dialog">
            <p>Are your Sure you want to delete this chat?</p>
            <div className="buttons">
            <button className="delete-dialog-delete" onClick={handleOnDelete}>Delete</button>
            <button className="delete-dialog-cancel" onClick={()=>onDelete(op=>!op)}>Cancel</button>
            </div>
        </div>
    );
}
export default DeleteOption;