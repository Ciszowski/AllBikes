//react
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//tools
import { objCard } from '../miscellaneous/Data';
import {useProfile} from '../miscellaneous/Style';
//component
import MyFavoris from './Favoris';
import ModifProfile from './ModifProfil';
import Admin from './Admin';
import ChangePass from './ChangePass';
import FindOwnBike from './FindOwnBike';
//img
import avatar from '../../gallerie/avatar.jpg';
//material
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

export default function MyProfile(props) {
    const classes = useProfile();
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
            return alert('Access Denied')
        }
        return dispatch({type: 'SETVALUE', value: valueProfile})
    }
    const profilCard = user.privilege? objCard: objCard.slice(0,-1)
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
                        {profilCard.map((el, idx) => {
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