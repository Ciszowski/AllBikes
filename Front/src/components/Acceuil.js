import React from 'react';
import { useDispatch } from 'react-redux';
import { HomeData } from './navData/Data';
import "./main.css";
import {
    Card,
    CardActionArea,
    Container,
    CardContent,
    makeStyles,
    CardMedia,
    Typography
} from '@material-ui/core';
import firstImg from '../gallerie/firstImageHome.jpg'

const useStyles = makeStyles({
    root: {
        width: '100%',
        display: "flex",
        flexDirection: 'column',
    },
    card: {
        width: "100%",
        backgroundColor: "#A2996E",
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-between",
        borderTop: '15px solid #262719'
    },
    cardActions:{
        width: 'calc(40vw + 75px)',
    },
    cardImg: {
        width: 'calc(40vw + 75px)',
        height: 'calc(40vh + 50px)'
    },
    cardContent:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',

    },
    text:{
        padding:'25px',
        fontSize:"calc(0px + 2vh)",
        fontWeight: "bolder",
        textAlign: "center",
        color: "#4A5602",
    }
})

export default function Home(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    function onNavigate(value) {
        dispatch({ type: 'VALUE&LINK', payload: value })
        return props.history.push(`/${value}`);
    }
    return (
        <Container maxWidth="lg" className={classes.root}>
            <Card className="cardPrincip">
                <CardMedia
                    className="imgPrincip"
                    image={firstImg}
                />
                <CardContent className="cardContentPrincip">
                    <Typography variant="h3" className="txtPrincip">
                        AllBikes
                    </Typography>
                    <Typography variant="h4" className="txtPrincip" >
                        Aimez la diversité!
                    </Typography>
                    <Typography variant="h5" className="txtPrincip">
                        Trouvez le vélo de vos rêves!
                    </Typography>
                    <Typography variant="h6" className="txtPrincip" >
                        Comparez tout les vélos que vous pourriez appréciez !
                    </Typography>
                </CardContent>
            </Card>

            {HomeData.map((element, idx) => {
                if ((idx % 2) === 0) {
                    return (
                        <Card key={idx} className={classes.card}>
                            <CardActionArea 
                                className={classes.cardActions}
                                onClick={() => onNavigate(element.value)}>
                                <CardMedia
                                    image={element.image}
                                    className={classes.cardImg}
                                />
                            </CardActionArea>
                            <CardContent className={classes.cardContent}>
                                <Typography className={classes.text} variant="body2">{element.description}</Typography>
                            </CardContent>
                        </Card>
                    )
                } else {
                    return (
                        <Card key={idx} className={classes.card}>
                            <CardContent className={classes.cardContent}>
                                <Typography className={classes.text} variant="body2"> {element.description} </Typography>
                            </CardContent>
                            <CardActionArea onClick={() => onNavigate(element.value)}>
                                <CardMedia
                                    image={element.image}
                                    className={classes.cardImg}
                                />
                            </CardActionArea>
                        </Card>
                    )
                }
            })}
        </Container>
    )
}