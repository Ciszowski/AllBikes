import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, CardActionArea, CardHeader, CardMedia, CardContent, Typography, IconButton, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: "space-evenly",
    },
    title: {
        textAlign: 'center',
        padding: '15px 15px',
        margin: '0 25% 50px 25%',
        backgroundColor: '#39CCCC',
        color: 'white'
    },
    card: {
        position: 'relative'
    },
    cardBike: {
        backgroundColor: "white",
        position: 'relative',
        marginTop: "5px",
        paddingTop: '35px',
        display: 'flex',
        flexDirection: 'column',
        border: "2px solid #01FF70",
    },
    cardHeader: {
        position: 'absolute',
        top: 1,
        left: 1,
        fontWeight: 'bolder',
        color: "#0074d9"
    },
    price: {
        position: 'absolute',
        top: 1,
        right: 1,
    },
    cardContent: {
        height: "10px",
        border: "2px solid #01FF70",
        width: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        color: "#0074d9",
        backgroundColor: '#39CCCC',
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


    useEffect(() => {
        if (resQuizz.modele && resQuizz.price.length) {
            fetchResult()
        }
    }, [])

    function fetchResult() {
        fetch('/dataBike/resultQuizz', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ modele: resQuizz.modele, price: resQuizz.price })
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

    console.log('result data', props)
    return (
        <Container className={classes.root} maxWidth="lg">
            <h1 className={classes.title}>
                <Icon>star</Icon>
                &nbsp;Vos Velos qui vous correspondent &nbsp;
                <Icon>star</Icon>
            </h1>

            <Typography> Plusieurs variations de Lorem Ipsum peuvent être trouvées ici ou là, mais la majeure partie d'entre elles a été altérée par l'addition d'humour ou de mots aléatoires qui ne ressemblent pas une seconde à du texte standard. Si vous voulez utiliser un passage du Lorem Ipsum, vous devez être sûr qu'il n'y a rien d'embarrassant caché dans le texte. Tous les générateurs de Lorem Ipsum sur Internet tendent à reproduire le même extrait sans fin, ce qui fait de lipsum.com le seul vrai générateur de Lorem Ipsum. Iil utilise un dictionnaire de plus de 200 mots latins, en combinaison de plusieurs structures de phrases, pour générer un Lorem Ipsum irréprochable. Le Lorem Ipsum ainsi obtenu ne contient aucune répétition, ni ne contient des mots farfelus, ou des touches d'humour.
            </Typography>
            {resultData && (
                resultData.map((element, index) => {
                    const linkImg = ('/' + element.categorie) + (element.image)
                    return (
                        <Card key={index} className={classes.card}>
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