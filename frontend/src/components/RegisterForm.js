import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = '';
//const API_BASE_URL = 'http://localhost';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validate = () => {
        if (!username || !email || !password) {
            alert('All fields are required.');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Please enter a valid email address.');
        }
        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await axios.post(
                `${API_BASE_URL}/api/register`,
                { username, email, password }
            );
            alert('Registered successfully. You can now log in.');
            setUsername('');
            setEmail('');
            setPassword('');
        } catch (error) {
            alert('Registeration failed: ' + (error?.response?.data?.detail || error.message));
        }
    };

    return (
        <form onSubmit={handleSubmit} className='form-box'>
            <input 
                type="text"
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input 
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type='password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder='Password' 
            />
            <button type='submit' className='btn-primary'>
                Register
            </button>
        </form>
    );
};

export default RegisterForm;
