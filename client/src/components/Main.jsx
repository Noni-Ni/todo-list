import { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import Spinner from "./Spinner";
import AddTodo from "./AddTodo";

export default function Main() {

    const [todos, setTodos] = useState([]);
    const [pending, setPending] = useState(true);
    const [addTodo, setAddTodo] = useState(false);
    const [task, setTask] = useState({
        text: '',
        isCompleted: false
    })
    useEffect(() => {
        (async function getTodos() {
            const response = await fetch('http://localhost:3030/jsonstore/todos')
            const data = await response.json();
            setTodos(Object.values(data))
            setPending(false)
        })()
    }, [todos]);


    const changeStatusHandler =  (todoId) => {
        
        
        setTodos(oldTodos => oldTodos.map(todo => todo._id === todoId ? { ...todo, isCompleted: !todo.isCompleted }  : todo))

        const data = todos.find(todo => todo._id === todoId);
        data.isCompleted = !data.isCompleted
        
        async function edit(data) {
            const response = await fetch(`http://localhost:3030/jsonstore/todos/${data._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                   
                });

            const responseData = await response.json();
            console.log(responseData)
        }
        edit(data);
    }

    const addTodoHanler = () => {
        setAddTodo(true)

    }
    const addTodoHanlerClose = () => {
        setAddTodo(false)

    }

    const formHanler = (e) => {

        e.preventDefault();
        async function addTodo() {
            const response = await fetch('http://localhost:3030/jsonstore/todos',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(task)
                });

            const responseData = await response.json();

            setTodos(oldTodos => [...oldTodos, responseData]);
            setTask({
                text: '',
                isCompleted: false
            })
            setAddTodo(false)
        }
        addTodo();
    }
    const onChangeHandler = (event) => {

        setTask(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value
        }))

    }


    return (
        <main className="main">
            <section className="todo-list-container">
                <h1>Todo List</h1>

                <div className="add-btn-container">
                    <button className="btn" onClick={addTodoHanler} >+ Add new Todo</button>
                </div>
                <div className="table-wrapper">

                    {pending && <Spinner />}
                    {addTodo && <AddTodo onClose={addTodoHanlerClose} onSave={formHanler} onChangeHandler={onChangeHandler} task={task} />}

                    <table className="table">
                        <thead>
                            <tr>
                                <th className="table-header-task">Task</th>
                                <th className="table-header-status">Status</th>
                                <th className="table-header-action">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map(todo => <ToDoItem key={todo._id} todo={todo} changeStatusHandler={changeStatusHandler} />)}



                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    )
}