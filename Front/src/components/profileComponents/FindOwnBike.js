import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Card, CardMedia, CardContent, Typography, DialogContent, DialogTitle, CardActionArea, DialogActions, Button, IconButton, Icon, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { questionMark, questionPrice } from '../miscellaneous/Data';
import ResultQuizz from './ResultQuizz';

const useStyles = makeStyles(theme => ({
    root: {
        color:"#262719",
        display: 'flex',
        width: '100%',
        flexDirection: "row",
        justifyContent: 'flex-end'
    },
    card: {
        margin: '15px 30px',
    },
    dialogTitle: {
        color:"#F6F8D3",
        backgroundColor: '#4A5602',
        textAlign: 'center',
        padding:'0',
        margin:"0"
    },
    cardMedia: {
        height: '200px',
        width: '220px'
    },
    dialogText: {
        backgroundColor: '#A2996E',
        color: "#262719",
        textAlign: 'center',
    },
    dialogContent: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
    },
    iconBtn: {
        backgroundColor: "#4A5602",
        color:"#F6F8D3",
        fontSize: "50px"
    }
}))


// anthonyciszowski@gmail.com


export default function FindOwnBike(props) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const question = useSelector((state) => ({
        modele: state.listBike.modele,
        price: state.listBike.price,
        quizz: state.listBike.quizz,
        step: state.listBike.step
    }));

    async function getQuizz() {
        return (
            await fetch('/quizz/initQuizz')
                .then((res) => res.json())
                .then((quizz) => {
                    dispatch({ type: "LOADQUIZZ", payload: quizz.objQuizz });
                    setOpen(true);
                })
        )
    }

    useEffect(() => {
        if (!question.modele) {
            getQuizz();
        }
    }, [])
    function reInitiateQuizz() {
        dispatch({ type: "REINITQUIZZ" })
        return getQuizz()
    }
    function getNextQuestion(index) {
        if (question.quizz[index].next) {
            return dispatch({ type: "GETNEXT", payload: index })
        } else {
            if (question.modele) {
                dispatch({ type: "SETPRICE", payload: question.quizz[index].value })
                setOpen(false);
            } else {
                return dispatch({
                    type: "GETPRICE", payload:
                        { quizzPrice: questionPrice, modele: question.quizz[index].modele }
                })
            }
        }
    }
    return (
        <React.Fragment>
            <Container maxWidth="xl" className={classes.root}>
                <Typography variant="h6" component="h6" gutterBottom> Recommencer</Typography>
                <IconButton
                    className={classes.iconBtn}
                    onClick={() => reInitiateQuizz()}
                >
                    <Icon style={{fontSize:"25px"}}>cached</Icon>
                </IconButton>
            </Container>
            {question.price.length ?
                <ResultQuizz {...props} />
                :
                <Dialog
                    maxWidth="lg"
                    className={classes.dialog}
                    open={open}>
                    <DialogTitle className={classes.dialogTitle}>
                        <h4> {questionMark[question.step].Q} </h4>
                    </DialogTitle>
                    <DialogContent className={classes.dialogContent} dividers={true}>
                        {question.quizz && (
                            question.quizz.map((question, idx) => {
                                return (
                                    <Card className={classes.card} key={idx}>
                                        <CardActionArea onClick={() => getNextQuestion(idx)}>
                                            {question.image && (
                                                <CardMedia
                                                    className={classes.cardMedia}
                                                    image={props.location.pathname + '/' + question.image}
                                                    title={question.title}
                                                />)}
                                            <CardContent className={classes.dialogText}>
                                                <Typography variant="h6"> {question.title} </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                )
                            })
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => dispatch({ type: "VALUE&LINK" })}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            }
        </React.Fragment>
    )
}