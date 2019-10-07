import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import '../mainCss.css'
import { useDispatch } from 'react-redux';

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
const allTypesOfBikes = ['Course','Trekking', 'VTT', 'velo-de-ville','VAE']


export default function ButtonAppBar(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen]= useState(null)


    function handleOver(ev) {
        setOpen(ev.currentTarget);

    }
    function onNavigate(ev){
        async function asyncall(){
            await new Promise((resolve)=>{ 
                dispatch({type:'VALUE&LINK', payload: ev.target.value})
                console.log('ev.target', ev.target.value)
                resolve(props.history.push(ev.target.value))
            }) 
        }
        asyncall()
    }

    // function handleClose() {
    //     setOpen(null)
    // }

    return (
        <div className={classes.root} >
            <AppBar position="static" className={classes.appBar} >
                <Toolbar className={classes.toolbar}>
                    {allTypesOfBikes.map((el,idx) => {
                        return (
                            <Button className={classes.menuButton}
                                value={el}
                                key={idx} color="inherit" onClick={onNavigate} onMouseOver={handleOver}>{el}</Button>
                        )
                    })}
  
                    <span className={classes.space}></span>
                    <span className={classes.space}></span>
                    <span className={classes.space}></span>

                        <Button variant="contained" color="primary"
                            value="mon-compte"
                        onClick={onNavigate}>Mon Compte</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}