//react
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
//tools
import {useSingleBike} from '../miscellaneous/Style';  
//material
import { Container, 
        Typography,
        Card, 
        CardHeader, 
        CardContent, 
        Table, 
        TableCell, 
        TableRow, 
        Icon, 
        TableBody,
        IconButton, 
        CardMedia, 
        Snackbar, 
        Button} from '@material-ui/core';

export default function SingleBike(props) {
    const classes = useSingleBike();
    const user = useSelector((state)=>({
        id_user: state.register.id_user,
        email: state.register.email,
        login: state.register.isLogin,
        value: state.register.value,
        token: state.register.token
    }))
    const favoriList = useSelector((state)=>({
        favori: (state.listBike.favori).map((el) => el.model)
    }))
    const [disabled, setDisabled] = useState(false);
    const [data, setData] = useState(null);
    const [snackbar, setSnack] = useState({
        message: '',
        open: false
    })

    async function fetchSingleBike() {
        return await fetch('/dataBike/single-bike/' + props.match.params.name)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                return data
            })
    }
    useEffect(() => {
        fetchSingleBike().then((data)=>{
            favoriList.favori.includes(data[0].model) && (setDisabled(true));
        })
    }, [])
    
    const handleClose = ()=>{   
        setSnack({...snackbar, open: false})
    }
    
    function addFavori(){
        setDisabled(true)
        if(!user.login){
            return props.history.push('/mon-compte')
        }else{
            try {
                fetch('/favori/add',{
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type':'application/json',
                        'Authorization': 'Bearer '+ user.token
                    }),
                    body: JSON.stringify({model : data[0].model, id_user: user.id_user})
                })
                .then(res => res.json())
                .then((response)=>{
                    setSnack({ message : response.message , open: true})
                })
            }catch(error){
                setSnack({message: error, open: true })
            }
        }
    }
    const parentPath = props.match.url.replace(/(\/[^\/]+)$/gm, "");
    return (
        <React.Fragment>
            <Container maxWidth="xl" className={classes.rootHead}>
                <IconButton
                    className={classes.iconBtn}
                    color="primary"
                    onClick={() => props.history.push(user.value ? '/mon-compte': parentPath)}
                >
                    <Icon>backspace</Icon>
                </IconButton>
                <Button
                    className={classes.iconBtn}
                    variant="contained"
                    onClick={addFavori}
                    disabled={disabled}
                >
                     {user.login ? 'ajouter aux favoris': 'se connecter'} 
                     <Icon>star</Icon>
                </Button>   
            </Container>
            {data && (data.map((element, index) => {
                return (
                    <Container maxWidth="xl" fixed key={index} className={classes.root}>
                        <Card className={classes.cardImage}>
                            <CardMedia
                                image={parentPath + element.image}
                                title={element.model}
                                className={classes.image}
                            />
                        </Card>
                        <Card className={classes.card}>
                            <CardHeader
                                className={classes.header}
                                title={element.model}
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography variant="subtitle1" component="h3" 
                                className={classes.details}>
                                    {element.details}
                                </Typography>
                                <hr />
                                <Table>
                                      <TableBody>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                <Typography variant="h6" className={classes.typo} component="p">
                                                    Marque
                                            </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography variant="subtitle1" className={classes.typo} component="p">
                                                    {element.brand}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                <Typography variant="h6" className={classes.typo} component="p">
                                                    Matériaux
                                            </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography variant="subtitle1" className={classes.typo} component="p">
                                                    {element.material}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                <Typography variant="h6" className={classes.typo} component="p">
                                                    Année du modèle
                                            </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography variant="subtitle1" className={classes.typo} component="p">
                                                    {element.year}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                <Typography variant="h6"  className={classes.typo} component="p">
                                                    Prix du contructeur
                                            </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography variant="subtitle1" className={classes.typo} component="p">
                                                    {element.price} €
                                            </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                <Typography variant="h6"  className={classes.typo} component="p">
                                                    *Taille disponible
                                            </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography variant="subtitle1" className={classes.typo} component="p">
                                                    {element.size.map((size) => size + ', ')}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Container>
                )
            }))}

            <Container maxWidth="xl" className={classes.rootFoot}>
                <Typography variant="subtitle1" component="p"> 
                    *Toutes les tailles disponibles ne sont pas directement chez le constructeur, pour cela reférez-vous à un revendeur de cette marque près de chez vous.
                </Typography>
            </Container>
            <Snackbar
                message={snackbar.message}
                open={snackbar.open}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                autoHideDuration={3000}
                onClose={handleClose}
            />
        </React.Fragment>
    )
}