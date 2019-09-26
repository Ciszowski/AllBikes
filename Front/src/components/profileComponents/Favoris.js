import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function MyFavoris(){
    return(
        <React.Fragment>
            <p> ici seront tous les vélos ajoutés en favoris </p>
            sous modele 
            <ul>
                <caption> button => https://allbikes.fr/typeofbike/marques/:name </caption>
                <li>image</li>
                <li>titre du vélo </li>
                <li> icone => retirer / ajouter en favori </li>
            </ul>
        </React.Fragment>
    )
}