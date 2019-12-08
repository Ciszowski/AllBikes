import React from 'react';
import { useSelector } from 'react-redux';
import MyProfile from '../components/profileComponents/MyProfile';
import LoginPage from '../components/profileComponents/LoginPage';

export default function WithNoAuth(props) {
    const user = useSelector((state) => ({
        token: state.register.token
    }))

    if (user.token) {
        return <MyProfile {...props}/>
    }
    return <LoginPage />
}

