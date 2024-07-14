import styles from  './AddTodo.module.css';
export default function AddTodo({
    task,
    onSave,
    onClose,
    onChangeHandler
}) {
    return (
        <form onSubmit={onSave}>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="text">Text</label>
                    <div className="input-wrapper">
                        <span><i className="fa-solid fa-user"></i></span>
                        <input id="text" name="text" type="text" value={task.text} onChange={onChangeHandler} />
                    </div>
                </div>
                
            </div>

            <div id="form-actions">
                <button id="action-save" className="btn" type="submit" onClick={onSave} >Save</button>
                <button id="action-cancel" className="btn" type="button" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </form>
    )
}