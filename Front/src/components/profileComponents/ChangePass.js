import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
        backgroundColor: "white",
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
        height: '500px',
        width: '600px',
        margin: '0 30%',
    },
    card: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-around",
        backgroundColor: '#dbdbdb',
    },
    cardHead: {
        color: 'white',
        textAlign: 'center',
        display: 'flex',
        alignSelf: 'center',
        fontWeight: "bolder",
        backgroundColor: '#39CCCC',
    },
    cardContent: {
        height: '30%',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
}))



export default function ChangePass(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [valuePass, setValuePass] = useState({
        password: '',
        confirmPass: '',
    })

    const handleChange = props => (ev) => {

        setValuePass({ ...valuePass, [props]: ev.target.value })
    }
    function onSaveModif(){
        console.log('save modif')
        fetch('/auth/modifPass',{
            method: 'POST',
            headers: new Headers({
                'Content-Type':'application/json'
            }),
            body: JSON.stringify({password: valuePass.password, email: props.email})
        })
        .then((res)=>res.json())
          .then((resData)=>{
              dispatch({type:'VALUE&LINK'})
          })
    }
    const isDisabled = (valuePass.password === valuePass.confirmPass) && valuePass.password.length ? true : false
    return (
        <React.Fragment>
            <Container className={classes.root}>
                <Card color='primary' className={classes.card}>
                    <CardHeader
                        className={classes.cardHead}
                        title='Modification de votre mot de passe'/>
                    <CardContent className={classes.cardContent}>
                        <ValidationTextField
                            className={classes.input}
                            value={valuePass.password}
                            required
                            label="password"
                            type="password"
                            onChange={handleChange("password")}
                            variant="outlined" />
                        <ValidationTextField
                            className={classes.input}
                            value={valuePass.confirmPass}
                            required
                            label="confirmer le password"
                            type="password"
                            onChange={handleChange("confirmPass")}
                            variant="outlined" />
                    </CardContent>
                    <CardActions className={classes.button}>
                        <Button className={classes.button} 
                                variant="contained" 
                                color="primary"
                                disabled={!isDisabled}
                                onClick={onSaveModif}> Enregister mot de passe  </Button>
                    </CardActions>
                </Card>
            </Container>
        </React.Fragment>
    )
}