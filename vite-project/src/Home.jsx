import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { BsFillTrashFill } from 'react-icons/bs';
import { CiEdit } from "react-icons/ci";
function Home() {

    const [todos, setTodos] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {

        axios.delete('http://localhost:3001/delete/' + id)
            .then(result => {
                location.reload()
            })
            .catch(err => console.log(err))
    }

    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskValue, setEditTaskValue] = useState('');

    const startEdit = (id, currentTask) => {
        setEditTaskId(id);
        setEditTaskValue(currentTask);
    };

    const handleEditChange = (e) => {
        setEditTaskValue(e.target.value);
    };

    const handleUpdate = (id, updatedTaskValue) => {
        axios.put(`http://localhost:3001/edit/${id}`, { task: updatedTaskValue })
            .then(response => {
                setEditTaskId(null);
                setEditTaskValue('');
                location.reload();
               
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="home">
            <h2>To Do List</h2>
            <Create/>
            {todos.length === 0 ? (
                <div><h2>No Records</h2></div>
            ) : (
                todos.map(todo => (
                    <div key={todo._id} className="task">
                        {editTaskId === todo._id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editTaskValue}
                                    onChange={handleEditChange}
                                    onBlur={() => handleUpdate(editTaskId, editTaskValue)} 
                                    autoFocus
                                />
                                <button onClick={() => handleUpdate(editTaskId, editTaskValue)}>Save</button>
                            </div>
                        ) : (
                            <span className="taskVal">{todo.task}</span>
                        )}
                        <div>
                            <span>
                                <BsFillTrashFill
                                    className="icon"
                                    onClick={() => handleDelete(todo._id)}
                                />
                            </span>
                        </div>
                        <div>
                       
                                <span>
                                    <CiEdit
                                        className="icon"
                                        onClick={() => startEdit(todo._id, todo.task)}
                                    />
                                </span>
                   
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
export default Home