import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = '';
//const API_BASE_URL = 'http://localhost';

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const validate = () => {
        if (!username || !password) {
            alert("Please fill in all fields.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate())
            return;

        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/token`,
                new URLSearchParams({ username, password })
            );
            onLogin(response.data.access_token);
        } catch (error) {
            alert('Login failed: ' + (error?.respone?.data?.detail || error.message));
        }
    };

    return (
        <form onSubmit={handleSubmit} className='form-box'>
            <input 
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input 
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit' className='btn-primary'>
                Login
            </button>
        </form>
    );
};

export default LoginForm;