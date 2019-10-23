import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    TextField,
    CardContent,
    Slider,
    Container,
    CardMedia,
    Typography,
    CardHeader,
    CardActionArea
} from '@material-ui/core';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: "center",
    },
    card: {
        marginTop: "5px",
        display: 'flex',
        flexFlow: 'row wrap',
        backgroundColor: "#dbdbdb",
        border: "2px solid #01FF70",
    },
    cardBike: {
        color: "white",
        position: 'relative',
        marginTop: "5px",
        paddingTop: '35px',
        display: 'flex',
        flexDirection: 'column',
        border: "2px solid #01FF70",
    },
    cardHeader: {
        position: 'absolute',
        top: 1,
        left: 1,
        fontWeight: 'bolder',
        color: "#0074d9"
    },
    price: {
        position: 'absolute',
        top: 1,
        right: 1,
    },
    cardContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'space-evenly',
        height: '100%',
        width: '100%',
    },
    cardActions: {
        height: "10px",
        border: "2px solid #01FF70",
        width: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        color: "#0074d9",
        backgroundColor: '#39CCCC',
    },
    media: {
        display: 'flex',
        alignSelf: "center",
        backgroundSize: "75%",
        width: 200,
        height: 100
    },
    div: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    textField: {
        width: '180px',
        backgroundColor: 'white'
    },
    slider: {
        color: 'green',
        display: 'flex',
        alignSelf: 'center',
        width: '40%',
    }
});


export default function AllBikes(props) {
    const classes = useStyles();
    const link = useSelector((state) => state.register.link);
    const [selectItem, setSelectItem] = useState(null);
    const [value, setValue] = useState({
        subCategories: '',
        brand: '',
        material: '',
        price: [0, 100000],
        model: '',
    });
    
    const [dataBike, setDataBike] = useState({
        tempData: [],
        data: [],
    })


    async function fetchData() {
        const result = await fetch(`/dataBike/loadBikes/${link}`)
            .then((res) => res.json())
            .then((data) => {
                return data
            });
        setDataBike({ data: result, tempData: result });
        return result
    }
    useEffect(() => {
        fetchData().then((data) => {
            Object.keys(value).slice(0, -1).map((bikeAttr) => {
                const optionsBis = data.reduce((ac, el) => {
                    if (!(1 + ac.lastIndexOf(el[bikeAttr]))) {
                        ac.push(el[bikeAttr]);
                    }
                    return ac;
                }, ['']);
                return setSelectItem((prevState) => {
                    return {
                        ...prevState, [bikeAttr]: bikeAttr === 'price' ?
                            optionsBis.splice(1, optionsBis.length - 1).sort((a, b) => a - b) : optionsBis
                    }
                })
            })
        })
    }, [link])

    const handleChange = props => (ev, value) => {
        if (props === "price") {
            setValue((prevState) => {
                return { ...prevState, [props]: value }
            });
        } else {
            ev.persist()
            setValue((prevState) => {
                return { ...prevState, [props]: ev.target.value };
            })
        }
    }

    useEffect(() => {
        const newData = dataBike.data.filter((el) => {
            let isCheck= true;
            for (let i=0; i < Object.keys(value).length; i++){
                const attr = Object.keys(value);
                if(attr[i] === "price"){
                    if(el[attr[i]] >= value['price'][0] && el[attr[i]] <= value['price'][1]){
                        continue
                    }else{
                        isCheck=false;
                    }
                }else if((el[attr[i]].toLowerCase()).includes((value[attr[i]]).toLowerCase())){
                    continue
                }else{
                    isCheck= false;
                }
            }
            return isCheck && el;
        });
        setDataBike((prevState)=>{
            return {...prevState, tempData: newData}
        })
    }, [value])


    function testFunc(idName) {
        props.history.push(props.location.pathname+'/'+ idName.model.replace(/[' ']+/gi,'_'))       
    }

    return (
        <React.Fragment>
            <Container>
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent} >
                        <div className={classes.div}>

                            {selectItem && (Object.keys(selectItem).slice(0, -1).map((item, idx) => {
                                return (
                                    <TextField select
                                        key={idx}
                                        label={item}
                                        className={classes.textField}
                                        value={value.item}
                                        onChange={handleChange(item)}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        variant="outlined"
                                    >
                                        {selectItem[item].map((el, id) => {
                                            return (
                                                <option value={el} key={id}>
                                                    {el}
                                                </option>
                                            )
                                        })}
                                    </TextField>
                                )
                            }))}
                        </div>
                        <div className={classes.div}>
                            {selectItem && (
                                <Slider
                                    className={classes.slider}
                                    valueLabelDisplay='auto'
                                    onChange={handleChange("price")}
                                    value={value.price}
                                    min={selectItem ? selectItem['price'] && (selectItem['price'][0]) : 0}
                                    max={selectItem ? selectItem['price'] && (selectItem['price'][selectItem['price'].length - 1]) : 0}
                                />
                            )}

                            <TextField
                                label="Research model"
                                className={classes.textField}
                                value={value.model}
                                onChange={handleChange('model')}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                    </CardContent>

                </Card>

                <Card>

                </Card>
            </Container>
            <Container className={classes.root} maxWidth="xl">
                {dataBike.tempData && (
                    Object.keys(dataBike.tempData).map((element, index) => {
                        const img = dataBike.tempData[element].image.replace(/[a-zA-Z-]+\/?\/{1,}/gm, '')
                        const linkImg = props.match.path + img
                        return (
                            <Card key={index}>
                                <CardActionArea 
                                    variant="outlined" 
                                    className={classes.cardBike} 
                                    onClick={()=>testFunc(dataBike.tempData[element])}>

                                    <CardHeader
                                        className={classes.cardHeader}
                                        title={dataBike.tempData[element].brand}
                                    />
                                    <CardMedia
                                        className={classes.media}
                                        image={linkImg}
                                        title={dataBike.tempData[element].model}
                                    />
                                    <CardContent className={classes.cardActions}>
                                        <Typography variant="body1" >
                                            {dataBike.tempData[element].model}
                                        </Typography>
                                        <Typography variant="subtitle1" color="secondary" className={classes.price}>
                                            {dataBike.tempData[element].price} €
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )
                    })
                )}
            </Container>
        </React.Fragment>
    )
};