import React from 'react';
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
        alignItems: 'center',
        
    },
    appBar:{
        backgroundColor: '#39CCCC',
        maxHeight: 40,
    },
    space: {
        flex: '1 1 20rem'
    },
}));
const allTypesOfBikes = ['Course','Trekking', 'VTT', 'Ville','VAE']


export default function ButtonAppBar(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    function onNavigate(value){
        async function asyncall(){
            await new Promise((resolve)=>{ 
                dispatch({type:'VALUE&LINK', payload: value})
                resolve(props.history.push(`/${value}`));
            }) 
        }
        asyncall()
    }

    return (
        <div className={classes.root} >
            <AppBar position="static" className={classes.appBar} >
                <Toolbar className={classes.toolbar}>
                    {allTypesOfBikes.map((el,idx) => {
                        return (
                            <Button className={classes.menuButton}
                                value={el}
                                color="primary"
                                key={idx} 
                                onClick={()=>onNavigate(el)}>
                                    {el}
                            </Button>
                        )
                    })}
  
                    <span className={classes.space}></span>
                    <span className={classes.space}></span>
                    <span className={classes.space}></span>

                        <Button color="primary"
                            value="mon-compte"
                        onClick={()=> onNavigate('mon-compte')}>Mon Compte</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}