import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';

export default function SingleBike(props){
    const [data , setData] = useState(null);
    useEffect(()=>{
        return ()=>{
            fetch('/dataBike/getSingleBike/'+props.match.params.name)
            .then((res)=> res.json())
            .then((data)=>{
                setData(data)
            })
        }
    })
    return(
        <React.Fragment>
            <Container>
                i'm on singleBike views!
            </Container>
        </React.Fragment>
    )
}