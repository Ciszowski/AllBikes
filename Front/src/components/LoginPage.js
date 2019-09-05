import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Card,
    TextField,
    Button,
    CardHeader
} from '@material-ui/core';

const ValidationTextField = withStyles({
    root: {
        '& input:valid + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 6,
            padding: '4px !important', // override inline-style
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
        margin: theme.spacing.unit * 1
    },
    input: {
        width: 350,
        backgroundColor: 'white',
    }
}));

export default function LoginPage() {
    const classes = useStyles();
    const login = useSelector((state) => ({
            isLogin: state.register.isLogin,
        token: state.register.token
    }))
    const [value, setValue] = useState({
        nam: '',
        surname: '',
        email: '',
        password: '',
        confirmPass: '',
        isOpen: false
    })
    const handleChange = props => (e) => {
        setValue({ ...value, [props]: e.target.value })
    }
    useEffect(() => {
        console.log('redux login ',login)
    })
    function loginIn(e) {
        e.preventDefault()
        console.log("jarrive ici", value)
    }
    function SignIn(e) {
        e.preventDefault();
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
                        value={value.name}
                        label="name"
                        InputLabelProps={{ required: false }}
                        onChange={handleChange("name")}
                        variant="outlined" />
                    <ValidationTextField
                        className={classes.input}
                        value={value.surname}
                        label="surname"dfg
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
        </div>
    );
}

