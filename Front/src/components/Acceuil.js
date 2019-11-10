//react
import React from 'react';
import { useDispatch } from 'react-redux';
//tools
import { useAcceuil }  from "./miscellaneous/Style";
import { HomeData } from './miscellaneous/Data';
import firstImg from '../gallerie/firstImageHome.jpg'
import "./main.css";
//material
import {
    Card,
    CardActionArea,
    Container,
    CardContent,
    CardMedia,
    Typography
} from '@material-ui/core';

export default function Home(props) {
    const classes = useAcceuil();
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