import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Card,
    TextField,
    Button,
    CardHeader,
    Snackbar,
} from '@material-ui/core';

const ValidationTextField = withStyles({
    root: {
        '& input:valid + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 6,
            padding: '4px !important',
        },
    },
})(TextField);


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    cardCo: {
        width: 400,
        height: '20rem',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#dbdbdb',

    },
    cardIn: {
        width: 400,
        height: '30rem',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#dbdbdb',

    },
    buttonInscription: {
        maxHeight: 50,
    },
    cardHeader: {
        backgroundColor: '#3f51b5',
        color: 'white',
        textAlign: 'center',
    },
    textfield: {
        display: 'flex',
        flexDirection: "column",
        flexGrow: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    cardActions: {
        alignSelf: 'flex-end',
        margin: theme.spacing(1)
    },
    input: {
        width: 350,
        backgroundColor: 'white',
    }
}));

export default function LoginPage(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const login = useSelector((state) => (
        {
            isLogin: state.register.isLogin,
        }))
    const [msgServer, setMessage] = useState({
        msg: '',
        bool: false
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

    function loginIn(e) {
        e.preventDefault()
        fetch('/auth/loginIn', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json' 
            }),
            body: JSON.stringify({ value }), 
        })
            .then((res) => {
                if (!res.ok) {
                    setMessage({ bool: true, msg: res.statusText});
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
                return res.json()
            })
            .then((data, error) => {
                if (error) {
                    console.log('error', error)
                }
                dispatch({type: 'REGISTER', payload: data})
            })
    }

    function SignIn(e) {
        e.preventDefault();
        fetch('/auth/signIn', {
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
                setMessage({ bool: true, msg:resFin.message});
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
    }
    const isDisabled = value.email.length
                            && value.password.length ? true : false
    const isDisabledIn =
                    (value.password === value.confirmPass && value.email.length)
                            && value.password.length ? true : false 
    return (
        <div className={classes.root}>
           {value.isOpen && (
                <Button variant="contained"
                    color="primary"
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
                    <form className={classes.textfield} onSubmit={loginIn}>
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
                            label="password"
                            type="password"
                            onChange={handleChange("password")}
                            InputLabelProps={{ required: false }}
                            variant="outlined" />

                        <Button
                            className={classes.cardActions}
                            variant="contained"
                            disabled={!isDisabled}
                            type="submit"
                            color="primary">
                            se connecter
                </Button>
                    </form>
            </Card>)}
            {!value.isOpen && (
                <Button variant="contained"
                color="primary"
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
                    
                <form className={classes.textfield} onSubmit={SignIn}>
                    <ValidationTextField
                        className={classes.input}
                        value={value.name }
                        label="name"
                        type="text"
                        InputLabelProps={{ required: false }}
                        onChange={handleChange("name")}
                        variant="outlined" />
                    <ValidationTextField
                        className={classes.input}
                        value={value.surname}
                        type="text"
                        label="surname"
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
                        label="password"
                        type="password"
                        onChange={handleChange("password")}
                        InputLabelProps={{ required: false }}
                        variant="outlined" />
                    <ValidationTextField
                        className={classes.input}
                        value={value.confirmPass}
                        required
                        label="confirmer le password"
                        type="password"
                        onChange={handleChange("confirmPass")}
                        InputLabelProps={{ required: false }}
                        variant="outlined" />
                    <Button
                        className={classes.cardActions}
                        variant="contained"
                        disabled={!isDisabledIn}
                        type="submit"
                        color="primary">
                        s'enregistrer'
                   </Button>
                </form>
                </Card>)}
            {msgServer && (<Snackbar
                    open={msgServer.bool}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                    autoHideDuration={3000}
                    message={<span>`{msgServer.msg}`</span>}
                />)}
        </div>
    );
}

