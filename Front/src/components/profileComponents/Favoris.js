import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function MyFavoris(){
    const user = useSelector((state)=>({
        id_user: state.register.id_user
    }))
    const [data, setData]= useState([])

    async function getFavori(){
        await fetch('/favori/getFavori/'+user.id_user)
        .then((res)=>res.json())
        .then((data)=>{
            setData(data)
        })
    }

    useEffect(()=>{
        getFavori();
    },[])
    
    return(
        <React.Fragment>

        </React.Fragment>
    )
}