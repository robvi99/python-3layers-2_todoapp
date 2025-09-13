import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = '';
//const API_BASE_URL = 'http://localhost';

const TodoList = ( {token, onLogout}) => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchTodos();
    }, [token]);

    const fetchTodos = async () => {
        if (!token) {
            console.error('No token provided');
            return;
        }
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/todos`,
                {headers: { Authorization: `Bearer ${token}` } }
            );
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
            alert('Fail to get List of todos.');
        }
    };

    const createTodo = async (e) => {
        e.preventDefault();
        if (!token) {
        alert('No token found. Please log in first.');
        return;
        }
        
        try {
            await axios.post(
                `${API_BASE_URL}/api/todos`,
                { title, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchTodos()
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error creating Todo: ', error)
        }
    };

    const updateTodo = async (id, completed) => {
        try {
            await axios.put(
                `${API_BASE_URL}/api/todos/${id}`,
                { completed },
                { headers: {Authorization: `Bearer ${token}` } }
            );
            fetchTodos();
        } catch (error) {
            console.error('Error updating todo: ', error)
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(
                `${API_BASE_URL}/api/todos/${id}`,
                { headers: { Authorization: `Bearer ${token}`}}
            );
            fetchTodos();
        } catch (error) {
            console.error('Error deleting todo: ', error);
        }
    };
    const logout = async () => {
        try {
            await axios.post(
                `${API_BASE_URL}/api/logout`,
                {},
                { headers: { Authorization: `Bearer ${token}` }}
            );
        } catch (error) {
            console.error('Error logging out: ', error)
        }
        onLogout();
    };

    return (
        <div className='todo-container'>
            <div className='todo-header'>
                <h2>📋 My To-Do List</h2>
                <button className='btn-logout' onClick={logout}>Logout</button>
            </div>

            <form onSubmit={createTodo} className='todo-form'>
                <input 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder='Title' 
                />
                <input 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder='Description' 
                />
                <button type='submit' className='btn-primary'>Add</button>
            </form>
            {/* List Todos */}
            <ul className='todo-list'>
                {todos.map((todo) => (
                    <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                        <div className='todo-info'>
                            <strong>{todo.title}</strong>
                            <p>{todo.description}</p>
                            <span className={`status ${todo.completed ? 'completed' : 'pending'}`}>
                                {todo.title} - {todo.completed ? 'Completed' : 'Pending'}
                            </span>
                        </div>
                        
                        <div className="todo-actions">
                            <button c
                                lassName='btn-secondary' 
                                onClick={() => updateTodo(todo.id, !todo.completed)}
                            >
                                Toggle Completed
                            </button>
                            <button 
                                className='btn-delete' 
                                onClick={() => deleteTodo(todo.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li> 
                ))}
            </ul>
        </div>
    );
};

export default TodoList;