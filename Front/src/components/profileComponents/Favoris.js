//import react
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//tools
import {useFavori} from '../miscellaneous/Style';
//material
import {
    Card,
    CardMedia,
    Typography,
    CardHeader,
    CardContent,
    CardActionArea,
    Container,
    Icon,
    CardActions,
    IconButton,
    Dialog,
    DialogContentText,
    DialogActions,
    Button,
    DialogTitle,
    DialogContent,
    Snackbar
} from '@material-ui/core';

export default function MyFavoris(props) {
    const classes = useFavori();
    const dispatch = useDispatch();
    const user = useSelector((state) => ({
        id_user: state.register.id_user,
        token: state.register.token
    }))
    const favoriList = useSelector((state) => ({
        favori: state.listBike.favori
    }));
    const [open, setOpen] = useState({
        message: '',
        snack: false,
        dialog: false
    })

    function onNavigate(el) {
        dispatch({ type: 'LINK', payload: el.categorie })
        props.history.push('/' + el.categorie + '/' + (el.model).replace(/[' ']+/gi, '_'))
    };
    function handleOpen(value, msg) {
        setOpen({ ...open, [value]: true, message: msg })
    }

    function onDelete(model) {
        fetch(`/favori/delete/${model}&${user.id_user}`,{
            method: "GET",
            headers: new Headers({
                'Authorization': 'Bearer '+ user.token
            })
        })
            .then((res) => res.json())
            .then((response) => {
                handleOpen('snack', response.message)
                refreshFavori(model)
            })
    }

    function refreshFavori(model) {
        const newFavori = (favoriList.favori).filter((el) => el.model !== model)
        dispatch({ type: "LOADFAVORI", payload: newFavori })
        setOpen({ ...open, dialog: false })
    }   

    return (    
        <React.Fragment>    
            <h1 className={classes.title}>
                <Icon>star</Icon>
                &nbsp;Mes Favoris&nbsp;
                <Icon>star</Icon>
            </h1>
            <Container className={classes.root} maxWidth="xl">
                {favoriList.favori && (
                    (favoriList.favori).map((element, index) => {
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
                                <CardActions className={classes.deleteBtn}>
                                    <IconButton onClick={() => handleOpen('dialog', element.model)}>
                                        <Icon fontSize="large"> delete</Icon>
                                    </IconButton>
                                </CardActions>
                            </Card>
                        )
                    })
                )}
            </Container>
            <Dialog
                fullWidth={true}
                maxWidth="sm"
                open={open.dialog}
            >
                <DialogTitle className={classes.dialog}> {"Validation de supression du vélo"}</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText>
                        Êtes-vous sur de vouloir supprimer <strong>{open.message}</strong> de vos favoris?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen({ ...open, dialog: false })} color="secondary">
                        Annuler
                    </Button>
                    <Button onClick={() => onDelete(open.message)} className={classes.dialog}>
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                message={open.message}
                open={open.snack}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                autoHideDuration={3000}
                onClose={() => setOpen({ ...open, snack: false })}
            />
        </React.Fragment>
    )
};