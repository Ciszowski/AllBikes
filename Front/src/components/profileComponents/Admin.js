//react
import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
//tools
import { NavData, characteristic } from '../miscellaneous/Data';
import {useAdmin} from '../miscellaneous/Style';
//material
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

export default function Admin() {
    const classes = useAdmin();
    const dispatch = useDispatch();
    const user = useSelector((state)=> ({
        token: state.register.token
    }))
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
        fetch('/dataBike/addNewBike',{
            method:"POST",
            headers: new Headers({
                "Content-Type":"application/json",
                'Authorization': 'Bearer '+ user.token
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
            <Container maxWith="lg" className={classes.root}>
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
};