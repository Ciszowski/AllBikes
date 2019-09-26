import React, { useEffect, useState } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    withStyles,
    TextField,
    Card,
    Button,
    CardContent,
    CardHeader
} from '@material-ui/core';


const ValidationTextField = withStyles({
    root: {
        width: '20em',
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
        margin: '0 30%',
        height: '500px',
        width: '600px',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-around',
    },
    cardHead:{
        color :'white',
        fontWeight: "bolder",
        backgroundColor: '#3f51b5'
    },
    card:{
        padding: '5px 0',
        display:'flex',
        justifyContent: 'center'
    },
    button:{
        display:'flex',
        alignSelf: 'flex-end'
    },
}))

export default function ModifProfile(props) {

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
            console.log('resdata',payload)
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
                </Card>
                <Card className={classes.card}>
                    <CardContent>
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
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardContent>
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
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardContent>
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
                </Card>
                <Card className={classes.button}>
                    <Button className={classes.button} variant="contained" color="primary" onClick={onSaveModif}> Sauvegarder Modification </Button>
                </Card>
            </Container>
        </React.Fragment>
    )
}