import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import '../mainCss.css'
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center'


    },
    appBar:{
        maxHeight: 40,
    },
    space: {
        flex: '1 1 20rem'
    },
}));
const allTypesOfBikes = ['Course','Triathlon', 'VTT', 'velo-de-ville','VAE']


export default function ButtonAppBar(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const type = useSelector((state) => state.listBike.type);
    const navigate = useSelector((state) => state.listBike.navigate)
    
    const [open, setOpen]= useState(null)


    useEffect(() => {
        if (type && navigate) {
            dispatch({type:"STOP_NAVIG"})
            props.history.push(type)
        }
    })
    function handleOver(ev) {
        setOpen(ev.currentTarget);

    }

    // function handleClose() {
    //     setOpen(null)
    // }

    return (
        <div className={classes.root} >
            <AppBar position="static" className={classes.appBar} >
                <Toolbar  className={classes.toolbar}>
                    {allTypesOfBikes.map((el,idx) => {
                        return (
                            <Button className={classes.menuButton} key={idx} color="inherit" onClick={() => dispatch({ type: 'TYPE', payload: `${el}` })} onMouseOver={handleOver}>{el}</Button>
                        )
                    })}
  
                    <span className={classes.space}></span>
                    <span className={classes.space}></span>
                    <span className={classes.space}></span>

                        <Button variant="contained" color="primary"
                        onClick={() => dispatch({ type: 'TYPE', payload: 'mon-compte' })}>Mon Compte</Button>


                </Toolbar>
            </AppBar>
        </div>
    );
}