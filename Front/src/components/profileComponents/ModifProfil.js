//react
import React, { useState } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
//tools
import {useModifProfil, ValidationTextField} from "../miscellaneous/Style";
//material
import {
    Container,
    Card,
    Button,
    CardContent,
    CardHeader,
    CardActions
} from '@material-ui/core';

export default function ModifProfile() {
    const classes = useModifProfil();
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
            <Container maxWith="sm" className={classes.root}>
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
                            <Button style={{backgroundColor: '#4A5602', color:'#F6F8D3'}}  variant="contained" onClick={onSaveModif}> Sauvegarder Modification</Button>
                    </CardActions>
                </Card>
            </Container>
        </React.Fragment>
    )
}