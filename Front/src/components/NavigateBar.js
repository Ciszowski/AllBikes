import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Container, Icon } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    toolbar: {
        width: "100%",
        backgroundColor: '#A2996E',
        padding: "15px",
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    menuButton: {
        padding: "15px calc(3vw + 1vh)",
        display: "flex",
        fontWeight: "bolder",
        color: "#262719"
    },
    appBar: {
        backgroundColor: "#4A5602",
        width: '100%',
        height: "115px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: "10px",
    },
    accbtn: {
        padding: "15px",
        color: "#262719",
    },
    space: {
        flex: "1 4 auto"
    },
    title:{
        padding:0,
        margin: 0,
        color: "#F6F8D3"
    },
    subtitle: {
        fontSize:"calc(1vh + 0.3em)",
        margin: 0,
        color: "#F6F8D3"
    }
}));
const allTypesOfBikes = ['Course', 'Trekking', 'VTT', 'Ville', 'VAE']


export default function ButtonAppBar(props) {
    const classes = useStyles();
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
                    {allTypesOfBikes.map((el, idx) => {
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