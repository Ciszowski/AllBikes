//react
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//tools
import { NavData } from '../miscellaneous/Data';
import {useResultQuizz} from '../miscellaneous/Style';
//material
import { Container, Card, CardActionArea, CardHeader, CardMedia, CardContent, Typography, Icon } from '@material-ui/core';

export default function ResultQuizz(props) {
    const classes = useResultQuizz();
    const [resultData, setData] = useState(null)
    const dispatch = useDispatch();
    const user = useSelector((state) => ({
        token: state.register.token
    }));
    const resQuizz = useSelector((state) => ({
        modele: state.listBike.modele,
        price: state.listBike.price,
    }));
    const { modele, price } = resQuizz;

    useEffect(() => {
        if (modele && price.length) {
            fetchResult()
        }
    }, [])

    function fetchResult() {
        fetch('/quizz/resultQuizz', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ user.token
            }),
            body: JSON.stringify({ modele: modele, price: price })
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data.result)
            })
    }
    function onNavigate(element) {
        dispatch({ type: 'LINK', payload: element.categorie })
        props.history.push('/' + element.categorie + '/' + (element.model).replace(/[' ']+/gi, '_'))
    }
    return (
        <Container className={classes.root} maxWidth="xl">

            <h1 className={classes.title}>
                <Icon>star</Icon>
                &nbsp;Vos Velos qui vous correspondent &nbsp;
                        <Icon>star</Icon>
            </h1>

            <Typography variant="body1" component="p" className={classes.subtitle}>
                {NavData[NavData.findModele(modele)][modele]}
            </Typography>

            {resultData && (
                resultData.map((element, index) => {
                    const linkImg = ('/' + element.categorie) + (element.image)
                    return (
                        <Card key={index} >
                            <CardActionArea
                                variant="outlined"
                                className={classes.cardBike}
                                onClick={() => onNavigate(element)}
                            >

                                <CardHeader
                                    className={classes.cardHeader}
                                    title={element.brand}
                                />
                                <CardMedia
                                    className={classes.media}
                                    image={linkImg}
                                    title={element.model}
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography variant="h6" >
                                        {element.model}
                                    </Typography>
                                    <Typography variant="subtitle1" color="secondary" className={classes.price}>
                                        {element.price} €
                                        </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )
                })
            )}
        </Container>
    )
}