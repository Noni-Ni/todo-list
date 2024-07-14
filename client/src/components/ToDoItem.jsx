export default function ToDoItem({
    todo,
    changeStatusHandler
}) {

    const classes = ['todo']
    
    if(todo.isCompleted){
        classes.push('is-completed')
    }
    
    return (
        <tr className={ classes.join(' ') }>
            <td>{todo.text}</td>
            <td>{todo.isCompleted ? 'Complete' : 'Incomplete'}</td>
            <td className="todo-action">
                <button className="btn todo-btn" onClick={() => changeStatusHandler(todo._id)} >Change status</button>
            </td>
        </tr>
    )
}