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
    root:{
        display:'flex',
        justifyContent: "center",
        marginTop:"9%"
    },
    card : {
        zIndex:"1",
        position:"relative",
        padding:'45px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-around",
        backgroundColor: '#A2996E',
    },
    cardHead:{
        color :'#F6F8D3',
        textAlign: 'center',
        display: 'flex',
        alignSelf: 'center',
        fontWeight: "bolder",
        backgroundColor: '#4A5602',
    },
    cardContent:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    button:{
        width:"50%",
        position:'absolute',
        bottom: "1px",
        right: "1px"
    },
    input:{
        margin: "15px 0",
    }
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
            <Container maxWith="sm" className={classes.root}>
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
                        <Button style={{backgroundColor: '#4A5602', color:'#F6F8D3'}}
                                variant="contained" 
                                disabled={!isDisabled}
                                onClick={onSaveModif}> Enregister mot de passe  </Button>
                    </CardActions>
                </Card>
            </Container>
        </React.Fragment>
    )
}