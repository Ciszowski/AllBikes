import React, { useState } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    withStyles,
    TextField,
    Card,
    Button,
    CardContent,
    CardHeader,
    CardActions
} from '@material-ui/core';


const ValidationTextField = withStyles({
    root: {
        width: '20em',
        backgroundColor: 'white',
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

const useStyles = makeStyles((theme) => ({
    root:{
        height: '500px',
        width: '600px',
        margin: '0 30%',
    },
    card : {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-around",
        backgroundColor: '#dbdbdb',
    },
    cardHead:{
        color :'white',
        textAlign: 'center',
        display: 'flex',
        alignSelf: 'center',
        fontWeight: "bolder",
        backgroundColor: '#39CCCC',
    },
    cardContent:{
        height: '50%',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button:{
        display:'flex',
        justifyContent: 'flex-end',
    },
}))

export default function ModifProfile() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const data = useSelector((state) => ({
        name: state.register.name,
        surname: state.register.surname,
        email: state.register.email,
        token: state.register.token
    }))
    const [value, setValue] = useState({
        name: data.name,
        surname: data.surname,
        email: data.email,
    })

    const handleChange = props => (ev) => {
        setValue({ ...value, [props]: ev.target.value })
    }

    function onSaveModif() {
        fetch('/auth/updateProfile',{
            method: 'POST',
            headers: new Headers({
                'Content-Type':'application/json'
            }),
            body: JSON.stringify({value, oldEmail: data.email })
        })
        .then(res => res.json())
        .then((resData)=>{
            const payload = Object.assign(resData.resultat[0], {token: data.token})
            dispatch({type: 'REGISTER', payload: payload})
        })
    }

    return (
        <React.Fragment>
            <Container className={classes.root}>
                <Card color='primary' className={classes.card}>
                    <CardHeader
                        className={classes.cardHead}
                        title='Modification de votre profil'/>
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
                            className={classes.input}
                            required
                            value={value.email}
                            type="email"
                            autoComplete="email"
                            label="email"
                            InputLabelProps={{ required: false }}
                            onChange={handleChange("email")}
                            variant="outlined" />
                    </CardContent>
                    <CardActions className={classes.button}>
                            <Button style={{backgroundColor: '#39CCCC', color:'white'}}  variant="contained" onClick={onSaveModif}> Sauvegarder Modification</Button>
                    </CardActions>
                </Card>
            </Container>
        </React.Fragment>
    )
}