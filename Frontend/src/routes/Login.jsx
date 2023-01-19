import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import TelegramWidgetLogin from '../components/TelegramWidgetLogin';
import { AuthContext } from '../context/AuthContext';
import { loginApi } from '../utils/api';

function Login() {
    const redirect = useNavigate();
    const { isAuth, loginUser } = useContext(AuthContext);
    const handleLogin = (user) => {
        const { first_name, last_name, username, id } = user;
        let data = {
            first_name,
            last_name,
            username,
            chatId: id
        }
        loginApi(data).then((res) => {
            let id = res._id;
            localStorage.setItem('token', id);
            loginUser(id);
        })
    }
    if (isAuth) {
        window.location.href = 'https://aman-bot.vercel.app/'
        return <></>
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '70vh', alignItems: 'center' }}>
            <h1>Login please </h1>
            <TelegramWidgetLogin
                dataOnauth={(user) => handleLogin(user)}
            />
        </div>
    );


}

export default Login;