import React from 'react';
import {
    Card,
    CardActionArea
} from '@material-ui/core';

export default function Home() {
    function testFunc(){
        console.log('je rentre ici')
    }
    return (
        <div>
            
                <CardActionArea onClick={testFunc}>
                    <p>je suis sur l'acceuil</p>
                </CardActionArea>
           
        </div>
    )
}