import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MyProfile from '../components/profileComponents/MyProfile';
import LoginPage from '../components/profileComponents/LoginPage';

export default function WithNoAuth() {
    const login = useSelector((state) => ({
        token: state.register.token
    }))
    useEffect(() => {
        console.log('withnoauth', login)
    })

    if (login.token) {
        return <MyProfile />
    }
    return <LoginPage />
}

