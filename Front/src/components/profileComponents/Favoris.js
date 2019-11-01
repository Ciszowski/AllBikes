import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
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
    deleteBtn: {
        position: 'absolute',
        bottom: -10,
        right: 0
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
    },
    dialog: {
        backgroundColor: '#39CCCC',
        color: 'white',
        fontWeight: 'bolder'
    }
})

export default function MyFavoris(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector((state) => ({
        id_user: state.register.id_user
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
        console.log('handle Open', value, open)
        setOpen({ ...open, [value]: true, message: msg })
    }

    function onDelete(model) {
        fetch(`/favori/deleteFavori/${model}&${user.id_user}`)
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
                direction="down"
            >
                <DialogTitle className={classes.dialog}> {"Validation de supression du vélo"}</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText>
                        Êtes-vous sur de vouloir supprimer {open.message} de vos favoris?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen({ ...open, dialog: false })} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => onDelete(open.message)} className={classes.dialog}>
                        OK
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