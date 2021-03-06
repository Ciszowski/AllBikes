//react
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
//tools
import {ValidationTextField, useLoginPage} from '../miscellaneous/Style';
//material
import {
    Card,
    Button,
    CardHeader,
    Snackbar,
    Container
} from '@material-ui/core';

export default function LoginPage(props) {
    const classes = useLoginPage();
    const dispatch = useDispatch();
    const [msgServer, setMessage] = useState({
        msg: '',
        open: false
    })
    const [value, setValue] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPass: '',
        isOpen: false
    })
    
    const handleChange = props => (e) => {
        setValue({ ...value, [props]: e.target.value })
    }

    function login(e) {
        e.preventDefault();
        fetch('/auth/login', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json' 
            }),
            body: JSON.stringify({ value }), 
        })
            .then((res) => {
                if (!res.ok) {
                    console.log('réponse negative', res)
                    setMessage({ open: true, msg: res.statusText});
                }
                return res.json()
            })
            .then((data, error) => {
                if (error) {
                    console.log('error', error)
                }
                setMessage({ open: true, msg: data.message});
                dispatch({type: 'REGISTER', payload: data})
            })
    }

    function Sign(e) {
        e.preventDefault();
        fetch('/auth/sign', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json' 
            }),
            body: JSON.stringify({ value }), 
        })
            .then((res) => res.json())
            .then((resFin, error) => {
                if (error) {
                    console.log('error', error)
                }
                setMessage({ open: true, msg:resFin.message});
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
    }

    const isDisabled = value.email.length && value.password.length 
    const isDisabledIn = (value.password === value.confirmPass && value.email.length) && (value.password.length)
    return(
        <Container className={classes.root}>
           {value.isOpen && (
                <Button variant="contained"
                    className={classes.buttonInscription}
                    onClick={() => setValue({ ...value, isOpen: false })}>
                        déjà inscrit ?
                </Button>)}
            
            {!value.isOpen && (
                <Card className={classes.cardCo}>
                    <CardHeader
                        className={classes.cardHeader}
                        color="primary"
                        title="Connection"
                    />
                    <form className={classes.textfield} onSubmit={login}>
                        <ValidationTextField
                            autoComplete="email"
                            className={classes.input}
                            required
                            value={value.email}
                            type="email"
                            label="email"
                            InputLabelProps={{ required: false }}
                            onChange={handleChange("email")}
                            variant="outlined" />
                        <ValidationTextField
                            className={classes.input}
                            value={value.password}
                            required
                            label="mot de passe"
                            type="password"
                            onChange={handleChange("password")}
                            InputLabelProps={{ required: false }}
                            variant="outlined" />

                        <Button
                            className={classes.cardActions}
                            variant="contained"
                            disabled={!isDisabled}
                            type="submit"
                            >
                            se connecter
                </Button>
                    </form>
            </Card>)}
            {!value.isOpen && (
                <Button variant="contained"
                className={classes.buttonInscription}
                onClick={() => setValue({ ...value, isOpen: true })}>
                    Pas de compte ?
                </Button>)}
                {value.isOpen && (
            <Card className={classes.cardIn}>
                <CardHeader
                    className={classes.cardHeader}
                    color="primary"
                    title="Inscriprition" />
                    
                <form className={classes.textfield} onSubmit={Sign}>
                    <ValidationTextField
                        className={classes.input}
                        value={value.name}
                        label="Nom"
                        InputLabelProps={{ required: false }}
                        onChange={handleChange("name")}
                        variant="outlined" />
                    <ValidationTextField
                        className={classes.input}
                        value={value.surname}
                        label="Prénom"
                        InputLabelProps={{ required: false }}
                        onChange={handleChange("surname")}
                        variant="outlined" />
                    <ValidationTextField
                        className={classes.input}
                        required
                        value={value.email}
                        type="email"
                        autoComplete="email"
                        label="email"
                        InputLabelProps={{ required: false }}
                        onChange={handleChange("email")}
                        variant="outlined" />
                    <ValidationTextField
                        className={classes.input}
                        value={value.password}
                        required
                        label="mot de passe"
                        type="password"
                        onChange={handleChange("password")}
                        InputLabelProps={{ required: false }}
                        variant="outlined" />
                    <ValidationTextField
                        className={classes.input}
                        value={value.confirmPass}
                        required
                        label="confirmer le mot de passe"
                        type="password"
                        onChange={handleChange("confirmPass")}
                        InputLabelProps={{ required: false }}
                        variant="outlined" />
                    <Button
                        className={classes.cardActions}
                        variant="contained"
                        disabled={!isDisabledIn}
                        type="submit"
                        >
                        s'enregistrer'
                   </Button>
                </form>
                </Card>)}
            {msgServer && (<Snackbar
                    open={msgServer.open}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                    autoHideDuration={2000}
                    message={<span>`{msgServer.msg}`</span>}
                />)}
        </Container>
    );
}

