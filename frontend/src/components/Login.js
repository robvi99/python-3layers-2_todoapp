import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = '';
//const API_BASE_URL = 'http://localhost';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/token`,
                new URLSearchParams({ username, password})
            );
            onLogin(response.data.access_token);
        } catch (error) {
            setUsername('');
            setPassword('');
            alert('Login failed: ', error)
        }
    };

    return (
        <form onSubmit={handleSubmit} className='border p-3 rounded'>
            <div className='mb-3'>
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
            </div>
            <div className='mb-3'>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            </div>
            <button type='submit' className='btn btn-primary'>Login</button>
        </form>
    );
};

export default Login;