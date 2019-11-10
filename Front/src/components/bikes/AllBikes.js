import React, { useEffect, useState, Suspense } from 'react';
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
    cardSelect: {
        margin: "45px 0",
        display: 'flex',
        flexFlow: 'row wrap',   
        backgroundColor: "#A2996E"
    },
    cardBike: {
        margin: '15px',
        backgroundColor: '#F6F8D3',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        border: "2px solid #4A5602",
    },
    cardHeader: {
        position:'absolute',
        padding:'0',
        margin: 0,
        fontWeight: 'bolder',
        color: "#4A5602"
    },
    price: {
        position: 'absolute',
        top: 1,
        right: 1,
    },
    cardContentSelect: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'space-evenly',
        height: '100%',
        width: '100%',
    },
    cardContentBike: {
        height: "10px",
        border: "2px solid #4A5602",
        width: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        color: "#4A5602",
        backgroundColor: '#A2996E',
    },
    media: {
        marginTop: "25px",
        backgroundSize: "90%",
        width: 250,
        height: 150
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
    },

});


const initialeState = {
    subCategories: '',
    brand: '',
    material: '',
    price: [0, 100000],
    model: '',
}


export default function AllBikes(props) {
    const classes = useStyles();
    const link = useSelector((state) => state.register.link);
    const [selectItem, setSelectItem] = useState({});
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
        setValue({ ...initialeState });
        const result = await fetch(`/dataBike/loadBikes/${link}`)
            .then((res) => res.json())
            .then((data) => {
                return data
            });
        setDataBike({ data: result, tempData: result });
        return result
    }
    useEffect(() => {
        setSelectItem({})
        fetchData().then((data) => {
            Object.keys(value).slice(0, -1).map((bikeAttr) => {
                const options = data.reduce((ac, el) => {
                    if (!(1 + ac.lastIndexOf(el[bikeAttr]))) {
                        ac.push(el[bikeAttr]);
                    }
                    return ac;
                }, ['']);
                return setSelectItem((prevState) => {
                    return {
                        ...prevState, [bikeAttr]: bikeAttr === 'price' ?
                            options.splice(1, options.length - 1).sort((a, b) => a - b) : options
                    }
                })
            })
        })
    },[link])

    const handleChange = props => (ev, value) => {
        if (props === "price") {
            setValue((prevState) => {
                return { ...prevState, [props]: value }
            });
        } else {
            ev.persist()
            setValue((prevState) => {
                return { ...prevState, [props]: ev.target.value };
            });
        }
    }

    useEffect(() => {
        const newData = dataBike.data.filter((el) => {
            let isCheck = true;
            for (let i = 0; i < Object.keys(value).length; i++) {
                const attr = Object.keys(value);
                if (attr[i] === "price") {
                    if (el[attr[i]] >= value['price'][0] && el[attr[i]] <= value['price'][1]) {
                        continue
                    } else {
                        isCheck = false;
                    }
                } else if ((el[attr[i]].toLowerCase()).includes((value[attr[i]]).toLowerCase())) {
                    continue
                } else {
                    isCheck = false;
                }
            }
            return isCheck && el;
        });
        setDataBike((prevState) => {
            return { ...prevState, tempData: newData }
        })
    }, [value])


    function onNavigate(idName) {
        props.history.push(props.location.pathname + '/' + idName.model.replace(/[' ']+/gi, '_'))
    }

    return (
        <React.Fragment>
            <Container>
                <Card className={classes.cardSelect}>
                    <CardContent className={classes.cardContentSelect} >
                        <div className={classes.div}>
                            {selectItem ? Object.keys(selectItem).slice(0, -1).map((item, idx) => {
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
                            }) : ''}
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
            <Suspense fallback={<h1> Loading ...</h1>}>
                <Container className={classes.root} maxWidth="xl">
                    {
                        dataBike.tempData.map((element, index) => {
                            const linkImg = props.match.path + (element.image)
                            return (
                                <Card key={index} className={classes.cardBike}>
                                    <CardActionArea
                                        variant="outlined"
                                        className={classes.cardActionsBike}
                                        onClick={() => onNavigate(element)}>

                                        <CardHeader
                                            className={classes.cardHeader}
                                            title={element.brand}
                                        />
                                        <CardMedia
                                            className={classes.media}
                                            image={linkImg}
                                            title={element.model}
                                        />
                                        <CardContent className={classes.cardContentBike}>
                                            <Typography variant="body1" >
                                                {element.model}
                                            </Typography>
                                            <Typography variant="subtitle1" color="secondary" className={classes.price}>
                                                {element.price} €
                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )}
                    )}
                </Container>
            </Suspense>
        </React.Fragment>
    )
};