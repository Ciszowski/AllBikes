import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavData, characteristic } from '../navData/Data';

import { makeStyles } from '@material-ui/core/styles';
import DirectionsIcon from '@material-ui/icons/Directions';
import {
    Container,
    IconButton,
    TextField,
    Card,
    Button,
    CardContent,
    CardHeader,
    CardActions,
    Typography,
    Snackbar
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '0 10%',
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
        height: '40%',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-around'
    },
    button: {
        backgroundColor:"#39CCCC",
        color:'white'
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    contain:{
        display:'inline-flex',
        position: 'relative'
    },
    iconButton: {
        position: 'absolute',
        top: '12px',
        right: '0px'
    },
    icon:{
        color:"#39CCCC",
        fontSize: '40px'
    },
    textField: {
        width: '20em',
        backgroundColor: "white",
    },
    multiline: {
        width: '60em',
        backgroundColor: "white",
    }
}))


export default function Admin() {
    const classes = useStyles()
    const dispatch = useDispatch();
    const [msgServer, setMessage] = useState({
        msg: '',
        bool: false
    })
    const [data, setData] = useState({
        categoryBike: 'Course',
        typeOfBike: 'Endurance',
        model: '',
        img: '',
        year: 0,
        price: 0,
        material: '',
        brand: '',
        tempSize : "",
        size: [],
        description: ''
    })

    const handleChange = props => (ev) => {
        if (props === 'categoryBike') {
            setData({
                ...data, categoryBike: ev.target.value,
                typeOfBike: Object.keys(NavData[ev.target.value]).filter((el, idx) => idx === 0).join('')
            })
        } else {
            const prop = props.length ? props : props.charact
            setData({ ...data, [prop]: ev.target.value })
        }
    }
    function addSize() {
        const {size, tempSize} = data;
        size.push(tempSize)
        setData({...data, tempSize: ""});
    }
    function onRegisterBike(){
        data.size.push(data.tempSize)
        fetch('/dataBike/addNewBike',{
            method:"POST",
            headers: new Headers({
                "Content-Type":"application/json"
            }),
            body: JSON.stringify(data)
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data){
                setMessage({ bool: true, msg:data.message});
                setTimeout(()=>{
                    dispatch({type:'VALUE&LINK'})
                },2000)
            }
        })
    }

    const isDisabled = Object.keys(data).filter((el) =>data[el].length && el !== 'tempSize').length === 
                        Object.keys(data).filter((el)=> el !== 'tempSize').length ? true : false
    return (
        <React.Fragment>
            <Container className={classes.root}>
                <Card color='primary' className={classes.card}>
                    <CardHeader
                        className={classes.cardHead}
                        title='Ajout d"un nouveau vélo' />
                        <Typography> Taille disponible: {data.size.map((el)=>  el + ' ')} </Typography>     
                    <CardContent className={classes.cardContent}>
                        <TextField select
                            className={classes.textField}
                            value={data.categoryBike}
                            onChange={handleChange('categoryBike')}
                            SelectProps={{
                                native: true,
                            }}
                            margin="normal"
                            variant="outlined"
                        >
                            {Object.keys(NavData).slice(0,-1).map((option, index) => {
                                return (<option key={index} value={option}>
                                    {option}
                                </option>)
                            })}
                        </TextField>
                        <TextField select
                            className={classes.textField}
                            value={data.typeOfBike}
                            onChange={handleChange('typeOfBike')}
                            SelectProps={{
                                native: true,
                            }}
                            margin="normal"
                            variant="outlined"
                        >
                            {data.categoryBike && (
                                (Object.keys(NavData[data.categoryBike]).map((option, index) => {
                                    return (<option key={index} value={option}>
                                        {option}
                                    </option>)
                                }))
                            )}
                        </TextField>
                        {Object.keys(characteristic).map((charact, idx) => {
                            const type = typeof characteristic[charact]
                            if (type === 'number') {
                                return charact === 'tempSize' ? (
                                    <div className={classes.contain} key={idx} >
                                        <TextField className={classes.textField} value={data[charact]} required label={charact} type="number"
                                            onChange={handleChange({ charact })} variant="outlined" margin="normal"/>
                                        <IconButton className={classes.iconButton} onClick={addSize}>
                                            <DirectionsIcon className={classes.icon} />
                                        </IconButton>
                                    </div>
                                ) : 
                                    <TextField key={idx} className={classes.textField} value={data[charact]} required label={charact} type="number"
                                    onChange={handleChange({ charact })} variant="outlined" margin="normal" />
                            } else if (type === 'string' && charact !== "description") {
                                return (
                                    <TextField key={idx} className={classes.textField} value={data[charact]} required label={charact} type="text"
                                        onChange={handleChange({ charact })} variant="outlined" margin="normal"
                                    />)
                            } else {
                                return (
                                    <TextField multiline rows="6" key={idx} value={data[charact]} className={classes.multiline} required label={charact}
                                        onChange={handleChange({ charact })} variant="outlined" margin="normal" />)
                            }
                        })}
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        <Button className={classes.button}
                            variant="outlined"
                            disabled={!isDisabled}
                            onClick={onRegisterBike}> 
                            Ajouter nouveau vélo 
                        </Button>
                    </CardActions>
                </Card>
                {msgServer && (<Snackbar
                    open={msgServer.bool}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                    autoHideDuration={3000}
                    message={<span>`{msgServer.msg}`</span>}
                />)}
            </Container>
        </React.Fragment>
    )
}