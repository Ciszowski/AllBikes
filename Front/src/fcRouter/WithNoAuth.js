import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MyProfile from '../components/profileComponents/MyProfile';
import LoginPage from '../components/profileComponents/LoginPage';

export default function WithNoAuth(props) {
    const login = useSelector((state) => ({
        token: state.register.token
    }))

    if (login.token) {
        return <MyProfile {...props}/>
    }
    console.log('log on smthg')
    return <LoginPage />
}

