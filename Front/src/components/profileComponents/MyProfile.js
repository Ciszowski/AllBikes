import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//component
import { objCard } from '../navData/Data'
import MyFavoris from './Favoris';
import ModifProfile from './ModifProfil';
import Admin from './Admin';
import ChangePass from './ChangePass';
import FindOwnBike from './FindOwnBike';
//img
import avatar from '../../gallerie/avatar.jpg';

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
        backgroundColor: '#A2996E',
        borderRadius: '50% 20% / 10% 40%',
    },
    head:{
        border:"5px groove #4A5602"
    },
    card: {
        backgroundColor:"#A2996E",
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
    iconBtn:{
        zIndex:"2",
        backgroundColor: '#4A5602',
        position: 'relative',
        top: '40px',
        left: '25px'
    },
    content: {
        border:"5px groove #4A5602",
        backgroundColor: '#4A5602',
        color:"#F6F8D3",
        textAlign: 'center',
        fontWeight: 'bolder'
    },
    avatar: {
        backgroundColor: 'white',
        height: 150,
        width: 140
    },
    space:{
        flex: '1 1 20rem'
    }
}))

export default function MyProfile(props) {
    const classes = useStyle();
    const dispatch = useDispatch();

    const [profil, setProfil] = useState({
        nbFavori: 0,
        date: ''
    })
    const user = useSelector((state) => (
        {
            id_user: state.register.id_user,
            name: state.register.name,
            surname: state.register.surname,
            email: state.register.email,
            privilege: state.register.privilege,
            value : state.register.value
        }))
    const objProfile = {
        favoris: <MyFavoris {...props}/>,
        profil: <ModifProfile />,
        password: <ChangePass email={user.email}/>,
        findOwnBike: <FindOwnBike {...props}/>,
        admin: <Admin />
    }

    useEffect(() => {
        getFavoris();
    },[]);
    
    async function getFavoris() {
        await fetch(`/dataBike/getFavori/${user.id_user}` )
            .then((res) => res.json())
            .then((data) => {
                setProfil({...profil, nbFavori: data.results.length})
                dispatch({ type: "LOADFAVORI", payload: data.results})
            })
    };

    function handleButtonProfile(ev){
        const valueProfile = ev.target.value ? ev.target.value : ev.target.title
        if (valueProfile === 'admin' && !user.privilege) {
            alert('Access Denied')
        }
        dispatch({type: 'SETVALUE', value: valueProfile})
    }

    return (
        <React.Fragment>
            {user.value && (
                <Container maxWidth="xl">
                    <IconButton
                        className={classes.iconBtn}
                        aria-label="back"
                        onClick={() => dispatch({type: "VALUE&LINK"})}
                    >
                        <Icon style={{fontSize: '25px'}}>backspace</Icon>
                    </IconButton>
                    {objProfile[user.value]}
                    
                </Container>
            )}
            {!user.value && (
                <React.Fragment>
                    <Container fixed className={classes.root}>
                        <Card className={classes.cardHeader}>
                            <CardHeader
                                className={classes.head}
                                avatar={
                                    <Avatar className={classes.avatar} >
                                        <img src={avatar} alt='avatar' className={classes.avatar} />
                                    </Avatar>}
                                title={user.name + ' ' + user.surname}
                                subheader={user.email}
                            />
                            <CardContent className={classes.content}>
                                <Typography variant="body1" component="p"> Nombre de favori : {profil.nbFavori}</Typography>
                                <Typography variant="body1" component="p"> {profil.date}</Typography>
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
                                        <Typography variant="h6"> {el.type} </Typography>
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