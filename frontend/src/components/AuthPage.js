import React, { useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import '../index.css'

const AuthPage = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className='auth-container'>
            {/* Left Side: Add image */}
            <div className='auth-image'>
                <img src='/illustration.png' alt='Illustration' />
                <h2>Plan your activities and control your progress</h2>
            </div>
            {/* Right side: Form Login/Register */}
            <div className='auth-form'>
                <div className='toggle-button'>
                    <button 
                        className={isLogin ? "active": ""}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={!isLogin ? "active": ""}
                        onClick={() => setIsLogin(false)}
                    >
                        Register
                    </button>
                </div>

                <div className='form-wrapper'>
                    <SwitchTransition>
                        <CSSTransition
                            key={isLogin ? "login" : "register"}
                            timeout={300}
                            classNames='fade'
                        >
                            <div>
                                {isLogin ? <LoginForm onLogin={onLogin} /> : <RegisterForm />}
                            </div>
                        </CSSTransition>
                    </SwitchTransition>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;