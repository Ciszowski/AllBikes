//react
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//tools
import { useModifProfil, ValidationTextField } from "../miscellaneous/Style";
//material
import {
    Container,
    Card,
    Button,
    CardContent,
    CardHeader,
    CardActions,
    Snackbar
} from '@material-ui/core';

export default function ModifProfile() {
    const classes = useModifProfil();
    const dispatch = useDispatch();
    const user = useSelector((state) => ({
        name: state.register.name,
        surname: state.register.surname,
        email: state.register.email,
        token: state.register.token
    }))
    const [value, setValue] = useState({
        name: user.name,
        surname: user.surname,
        email: user.email,
        open: false     
    })

    const handleChange = props => (ev) => {
        setValue({ ...value, [props]: ev.target.value })
    }

    function onSaveModif() {
        const matchEmail = /\@+[a-zA-Z0-9]+\.[a-z]{2,}$/gm 
        if (value.email.match(matchEmail)) {
            fetch('/auth/update', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ user.token
                }),
                body: JSON.stringify({value})
            })
                .then(res => res.json())
                .then((resData) => {
                    const payload = Object.assign(resData.resultat[0],{token: resData.newToken})
                    console.log('payload', payload)
                    dispatch({ type: 'REGISTER', payload: payload })
                })  
        } else {    
            setValue({ ...value, open: true })
        }
    }

    return (
        <React.Fragment>
            <Container maxWidth="sm" className={classes.root}>
                <Card color='primary' className={classes.card}>
                    <CardHeader
                        className={classes.cardHead}
                        title='Modification de votre profil' />
                    <CardContent className={classes.cardContent}>
                        <ValidationTextField
                            className={classes.input}
                            required
                            value={value.name}
                            type="text"
                            autoComplete="name"
                            label="name"
                            InputLabelProps={{ required: false }}
                            onChange={handleChange("name")}
                            variant="outlined" />
                        <ValidationTextField
                            className={classes.input}
                            required
                            value={value.surname}
                            type="text"
                            autoComplete="surname"
                            label="surname"
                            InputLabelProps={{ required: false }}
                            onChange={handleChange("surname")}
                            variant="outlined" />
                        <ValidationTextField
                            autoComplete="email"
                            className={classes.input}
                            required
                            value   ={value.email}
                            type="email"
                            label="email"
                            InputLabelProps={{ required: false }}
                            onChange={handleChange("email")}
                            variant="outlined" />
                    </CardContent>
                    <CardActions className={classes.button}>
                        <Button style={{ backgroundColor: '#4A5602', color: '#F6F8D3' }} variant="contained" onClick={onSaveModif}> Sauvegarder Modification</Button>
                    </CardActions>
                </Card>
            </Container>
            <Snackbar
                open={value.open}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                autoHideDuration={3000}
                message={<span>Veuillez rentrez un email valide</span>}
            />

        </React.Fragment>
    )
}