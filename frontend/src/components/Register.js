import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = '';
//const API_BASE_URL = 'http://localhost';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${API_BASE_URL}/api/register`,
                {
                    username,
                    email,
                    password
                }
            );
            setPassword('');
            setUsername('');
            setEmail('');
            alert('Registered successfully');
        } catch (error){
            setPassword('');
            alert('Registration failed: ' + (error?.response?.data?.detail || error.message));
        }
    };

    return (

        <form onSubmit={handleSubmit} className='border p-3 rounded'>
            <div className='mb-3'>
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
            </div>
            <div className='mb-3'>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
            </div>
            <div className='mb-3'>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            </div>
            <button type='submit' className='btn btn-primary'>Register</button>
        </form>
    );
};

export default Register;