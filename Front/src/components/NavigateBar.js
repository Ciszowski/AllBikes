//react
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
//tools
import { useNavigBar } from "./miscellaneous/Style";
import { NavData } from './miscellaneous/Data';
//material
import { Typography, Container, Icon ,AppBar, Toolbar, Button} from '@material-ui/core';

export default function ButtonAppBar(props) {
    const classes = useNavigBar();
    const dispatch = useDispatch();
    const user = useSelector((state) => ({
        isLogin: state.register.isLogin
    }))
    
    function onNavigate(value) {
        async function asyncall() {
            await new Promise((resolve) => {
                dispatch({ type: 'VALUE&LINK', payload: value })
                resolve(props.history.push(`/${value}`));
            })
        }
        asyncall();
    }
    return (
        <React.Fragment >
            <AppBar position="static" className={classes.appBar} >
                <Container maxWidth="xl" className={classes.header}>
                    <Typography variant="subtitle1" className={classes.subtitle} >
                        Trouvez le vélo qui vous correspond !
                    </Typography>
                    <Button onClick={() => props.history.push('/home')}>
                        <h1 className={classes.title}>Allbikes</h1>
                    </Button>
                    <Typography variant="subtitle1" className={classes.subtitle}>
                        Retrouvez nous sur &nbsp;
                        <Icon>facebook</Icon>
                    </Typography>
                </Container>
                <Toolbar className={classes.toolbar}>
                    {Object.keys(NavData).slice(0,-1).map((el, idx) => {
                        return (
                            <React.Fragment key={idx}>
                                <Button className={classes.menuButton}
                                    value={el}
                                    onClick={() => onNavigate(el)}>
                                    {el}
                                </Button>
                                <span></span> |
                            </React.Fragment>
                        )
                    })}
                    <span className={classes.space}></span>
                    <Button
                        className={classes.accbtn}
                        value="mon-compte"
                        onClick={() => onNavigate('mon-compte')}>
                        {user.isLogin ? "Mon compte" : "se connecter"}
                    </Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}