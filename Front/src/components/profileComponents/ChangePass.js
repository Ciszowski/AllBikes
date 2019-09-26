import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
    root: {
        margin: '0 30%',
        height: '500px',
        width: '600px',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-around',
    },
    cardHead: {
        color: 'white',
        fontWeight: "bolder",
        backgroundColor: '#3f51b5'
    },
    card: {
        padding: '5px 0',
        display: 'flex',
        justifyContent: 'center'
    },
    button: {
        display: 'flex',
        alignSelf: 'flex-end'
    },
}))



export default function ChangePass() {
    const classes = useStyles();

    const [valuePass, setValuePass] = useState({
        password: '',
        confirmPass: '',
    })

    const handleChange = props => (ev) => {
        setValuePass({ ...valuePass, [props]: ev.target.value })
    }
    function onSaveModif() {

    }

    return (
        <React.Fragment>
            <Container className={classes.root}>
                <Card color='primary' className={classes.card}>
                    <CardHeader
                        className={classes.cardHead}
                        title='Modification de votre profil' />
                </Card>
                <Card className={classes.card}>
                    <ValidationTextField
                        className={classes.input}
                        value={valuePass.password}
                        required
                        label="password"
                        type="password"
                        onChange={handleChange("password")}
                        InputLabelProps={{ required: false }}
                        variant="outlined" />
                    <ValidationTextField
                        className={classes.input}
                        value={valuePass.confirmPass}
                        required
                        label="confirmer le password"
                        type="password"
                        onChange={handleChange("confirmPass")}
                        InputLabelProps={{ required: false }}
                        variant="outlined" />
                </Card>
                <Card className={classes.button}>
                    <Button className={classes.button} variant="contained" color="primary" onClick={onSaveModif}> Sauvegarder Modification </Button>
                </Card>
            </Container>
        </React.Fragment>
    )
}