import React, { useState } from 'react' ;
import AuthPage from './components/AuthPage'
import TodoList from './components/TodoList';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const handleLogin = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    if (!token) {
        return <AuthPage onLogin={handleLogin} />;
    }

    return <TodoList token={token} onLogout={handleLogout} />
};

export default App;