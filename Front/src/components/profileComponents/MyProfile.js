import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//component
import MyFavoris from './Favoris';
import ModifProfile from './ModifProfil';
import Admin from './Admin';
import ChangePass from './ChangePass';

//img
import avatar from '../../gallerie/avatar.jpg'
import favoris from "../../gallerie/icone-favoris.png";
import home from '../../gallerie/blue-home.png';
import rouages from '../../gallerie/rouages.png';
import secret from '../../gallerie/top-secret.png'

//material
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    Avatar,
    Typography,
    Button,
    Container,
    IconButton,
    Icon
} from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    root: {
        margin: '2% auto',
        display: 'flex',
        justifyContent: 'center',
        flexFlow: 'row wrap',
    },
    cardHeader: {
        width: 490,
        textAlign: 'center',
        backgroundColor: '#d6d6d6',
    },
    card: {
        width: 250,
        margin: 25,
        borderRadius: '50% 20% / 10% 40%',
    },
    media: {
        height: 250,
        width: 345,
        marginRight: '30%',
        backgroundSize: 'contain',
    },
    content: {
        backgroundColor: '#dbdbdb',
        textAlign: 'center',
        fontWeight: 'bolder'
    },
    avatar: {
        backgroundColor: 'white',
        height: 150,
        width: 140
    },
}))


const objCard = [
    { value: 'favoris', typo: 'Mes favoris', image: favoris },
    { value: 'profil', typo: 'Modifier profil', image: home },
    { value: 'password', typo: 'Changer mot de passe', image: secret },
    { value: 'admin', typo: 'admin', image: rouages },
]


export default function MyProfile(props) {
    const classes = useStyle();
    const dispatch = useDispatch();

    const [date, setDate] = useState(null)
    const data = useSelector((state) => (
        {
            name: state.register.name,
            surname: state.register.surname,
            email: state.register.email,
            privilege: state.register.privilege,
            value : state.register.value
        }))
    const objProfile = {
        favoris: <MyFavoris />,
        profil: <ModifProfile />,
        password: <ChangePass email={data.email}/>,
        admin: <Admin />
    }

    function handleButtonProfile(ev){
        const valueProfile = ev.target.value ? ev.target.value : ev.target.title
        if (valueProfile === 'admin' && !data.privilege) {
            alert('Access Denied')
        }
        dispatch({type: 'SETVALUE', value: valueProfile})
    }
    
    return (
        <React.Fragment>
            {data.value && (
                <React.Fragment>
                    <IconButton aria-label="back" style={{color: '#39CCCC'}} onClick={() => dispatch({type: "VALUE&LINK"})}>
                        <Icon>backspace</Icon>
                    </IconButton>
                    {objProfile[data.value]}
                    
                </React.Fragment>
            )}
            {!data.value && (
                <React.Fragment>
                    <Container fixed className={classes.root}>
                        <Card className={classes.cardHeader}>
                            <CardHeader
                                className={classes.style}
                                avatar={
                                    <Avatar className={classes.avatar} >
                                        <img src={avatar} alt='avatar' className={classes.avatar} />
                                    </Avatar>}
                                title={data.name + ' ' + data.surname}
                                subheader={data.email}
                            />
                            <CardContent className={classes.cardHeader.content}>
                                <Typography variant="body2" color="textSecondary" component="p"> {date}</Typography>
                            </CardContent>
                        </Card>
                    </Container>
                    <Container className={classes.root} fixed>
                        {objCard.map((el, idx) => {
                            return (
                                <Card className={classes.card} key={idx}>
                                    <Button value={el.value} onClick={handleButtonProfile}>
                                        <CardMedia
                                            className={classes.media}
                                            image={el.image}
                                            title={el.value} />
                                    </Button>
                                    <CardContent className={classes.content}>
                                        <Typography variant="body1">  {el.typo}  </Typography>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </Container>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}