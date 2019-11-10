import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavData } from '../navData/Data';
import { Container, Card, CardActionArea, CardHeader, CardMedia, CardContent, Typography, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: "space-evenly",
    },
    subtitle:{
        color: "#262719",
        textAlign: "center",
        padding: "30px"
    },
    title: {
        textAlign: 'center',
        padding: '15px 15px',
        margin: '0 25% 10px 25%',
        backgroundColor: '#4A5602',
        color: '#F6F8D3'
    },
    cardBike: {
        backgroundColor: "F6F8D3",
        position: 'relative',
        marginTop: "5px",
        paddingTop: '35px',
        display: 'flex',
        flexDirection: 'column',
        border: "2px solid #A2996E",
    },
    cardHeader: {
        position: 'absolute',
        top: 1,
        left: 1,
        fontWeight: 'bolder',
        color: "#4A5602"
    },
    price: {
        position: 'absolute',
        top: 1,
        right: 1,
    },
    cardContent: {
        height: "10px",
        border: "2px solid #A2996E",
        width: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        color: "#F6F8D3",
        backgroundColor: '#4A5602',
        padding: "25px 25px",
        fontWeight: 'bolder'
    },
    media: {
        display: 'flex',
        alignSelf: "center",
        backgroundSize: "100%",
        width: 400,
        height: 300,
    }
})


export default function ResultQuizz(props) {
    const classes = useStyles();
    const [resultData, setData] = useState(null)
    const dispatch = useDispatch();
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
        fetch('/dataBike/resultQuizz', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
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
        <Container className={classes.root} maxWidth="lg">

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