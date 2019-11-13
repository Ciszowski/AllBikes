import {makeStyles, TextField,withStyles} from "@material-ui/core";

export const ValidationTextField = withStyles({
    root: {
        width: '20em',
        backgroundColor: "white",
        '& input:valid + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 6,
            padding: '4px !important',
        },
    },
})(TextField);

export const useAcceuil = makeStyles({
    root: {
        width: '100%',
        display: "flex",
        flexDirection: 'column',
    },
    card: {
        width: "100%",
        backgroundColor: "#A2996E",
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-between",
        borderTop: '15px solid #262719'
    },
    cardActions:{
        width: 'calc(40vw + 75px)',
    },
    cardImg: {
        width: 'calc(40vw + 75px)',
        height: 'calc(40vh + 50px)'
    },
    cardContent:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',

    },
    text:{
        padding:'25px',
        fontSize:"calc(0px + 2vh)",
        fontWeight: "bolder",
        textAlign: "center",
        color: "#4A5602",
    }
})


export const useNavigBar= makeStyles(() => ({
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

export const useAllBikes = makeStyles({
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


export const useSingleBike = makeStyles({
    rootHead: {
        width:"100%",
        backgroundColor: "#4A5602",
        display: 'flex',
        justifyContent: 'space-between',
    },
    root: {
        marginTop:'2%',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent:'center',
        alignItems:'center'
    },
    rootFoot: {
        backgroundColor: "#A2996E",
        display: "flex",
        justifyContent: 'center',
        color: '#262719',
    },
    iconBtn:{
        backgroundColor: '#A2996E', 
        color: '#F6F8D3'
    },
    cardImage:{
        maxHeight:'calc(25vw + 2rem)',
        marginRight:'10px'
    },
    image:{
        backgroundSize:"73%",
        width: "calc(50vw + 5rem)",
        height: "calc(22vw + 5rem)"
    },
    card: { 
        margin: "2% 0",
        color:'#4A5602',
        backgroundColor: "#F6F8D3"
    },
    header: {
        color: '#F6F8D3',
        fontWeight: 'bolder',
        backgroundColor: "#4A5602"
    },
    details: {
        margin: '55px 0',
    },
    typo:{
        color: '#4A5602',
    },
    cardContent:{
        marginLeft:'10px',
        maxWidth: "calc(25vw + 18rem)",
        textAlign:"center",
    }
});
export const useAdmin = makeStyles(() => ({
    root: {
        display:"flex",
        justifyContent:"center"
    },
    card: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-around",
        backgroundColor: '#A2996E',
    },
    cardHead: {
        color: '#F6F8D3',
        textAlign: 'center',
        display: 'flex',
        alignSelf: 'center',
        fontWeight: "bolder",
        backgroundColor: '#4A5602',
    },
    cardContent: {
        height: '40%',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-around'
    },
    button: {
        backgroundColor:"#4A5602",
        color:'#F6F8D3'
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    contain:{
        display:'inline-flex',
        position: 'relative'
    },
    iconButton: {
        position: 'absolute',
        top: '12px',
        right: '0px'
    },
    icon:{
        color:"#4A5602",
        fontSize: '40px'
    },
    textField: {
        width: '20em',
        backgroundColor: "white",
    },
    multiline: {
        width: '60em',
        backgroundColor: "white",
    }
}));
export const useChangePass = makeStyles((theme) => ({
    root:{
        display:'flex',
        justifyContent: "center",
        marginTop:"9%"
    },
    card : {
        zIndex:"1",
        position:"relative",
        padding:'45px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-around",
        backgroundColor: '#A2996E',
    },
    cardHead:{
        color :'#F6F8D3',
        textAlign: 'center',
        display: 'flex',
        alignSelf: 'center',
        fontWeight: "bolder",
        backgroundColor: '#4A5602',
    },
    cardContent:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    button:{
        width:"50%",
        position:'absolute',
        bottom: "1px",
        right: "1px"
    },
    input:{
        margin: "15px 0",
    }
}));
export const useFavori = makeStyles({
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: "space-evenly",
    },
    title: {
        textAlign: 'center',
        padding: '15px 15px',
        margin: '0 25% 50px 25%',
        backgroundColor: '#4A5602',
        color: '#F6F8D3'
    },
    card: {
        position: 'relative'
    },
    deleteBtn: {
        position: 'absolute',
        bottom: -10,
        right: 0
    },
    cardBike: {
        position: 'relative',
        marginTop: "5px",
        paddingTop: '35px',
        display: 'flex',
        flexDirection: 'column',
        border: "2px solid #A2996E",
    },
    cardHeader: {
        position: 'absolute',
        top: 1,
        left: 1,
        fontWeight: 'bolder',
        color: "#4A5602"
    },
    price: {
        position: 'absolute',
        top: 1,
        right: 1,
    },
    cardContent: {
        height: "10px",
        border: "2px solid #01FF70",
        width: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        color: "#F6F8D3",
        backgroundColor: '#4A5602',
        padding: "25px 25px",
        fontWeight: 'bolder'
    },
    media: {
        display: 'flex',
        alignSelf: "center",
        backgroundSize: "100%",
        width: 400,
        height: 300,
    },
    dialog: {
        backgroundColor: '#4A5602',
        color: '#F6F8D3',
        fontWeight: 'bolder'
    }
})

export const useLoginPage = makeStyles(theme => ({
    root: {
        margin: '10% auto',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: "space-around"
    },
    cardCo: {
        width: 400,
        height: '20rem',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#A2996E',
    },
    cardIn: {
        width: 400,
        height: '30rem',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#A2996E',

    },
    buttonInscription: {
        color: '#335601',
        maxHeight: 50,
        backgroundColor: '#A2996E',
    },
    cardHeader: {
        backgroundColor: '#335601',
        color: '#F6F8D3',
        fontWeight:"bolder",
        textAlign: 'center',
    },
    textfield: {
        display: 'flex',
        flexDirection: "column",
        flexGrow: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    cardActions: {
        alignSelf: 'flex-end',
        margin: theme.spacing(1),
        backgroundColor: '#335601',
        color: '#F6F8D3'
    },
    input: {
        width: 350,
        backgroundColor: 'white',
    }
}));

export const useModifProfil = makeStyles((theme) => ({
    root:{
        display:'flex',
        justifyContent: "center",
        marginTop:"9%"
    },
    card : {
        zIndex:"1",
        position:"relative",
        padding: '45px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-around",
        backgroundColor: '#A2996E',
    },
    cardHead:{
        color :'#F6F8D3',
        textAlign: 'center',
        display: 'flex',
        alignSelf: 'center',
        fontWeight: "bolder",
        backgroundColor: '#4A5602',
    },
    cardContent:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    button:{
        position:'absolute',
        bottom: "1px",
        right: "1px"
    },
    input:{
        margin: "15px 0",
    }
}))

export const useProfile = makeStyles((theme) => ({
    root: {
        margin: '2% auto',
        display: 'flex',
        justifyContent: 'center',
        flexFlow: 'row wrap',
    },
    cardHeader: {
        width: 490,
        textAlign: 'center',
        backgroundColor: '#A2996E',
        borderRadius: '50% 20% / 10% 40%',
    },
    head:{
        border:"5px groove #4A5602"
    },
    card: {
        backgroundColor:"#A2996E",
        width: 250,
        margin: 25,
        borderRadius: '50% 20% / 10% 40%',
    },
    media: {
        height: 250,
        width: 345,
        marginRight: '30%',
        backgroundSize: 'contain',
    },
    iconBtn:{
        zIndex:"2",
        backgroundColor: '#4A5602',
        position: 'relative',
        top: '40px',
        left: '25px'
    },
    content: {
        border:"5px groove #4A5602",
        backgroundColor: '#4A5602',
        color:"#F6F8D3",
        textAlign: 'center',
        fontWeight: 'bolder'
    },
    avatar: {
        backgroundColor: 'white',
        height: 150,
        width: 140
    },
    space:{
        flex: '1 1 20rem'
    }
}));

export const useResultQuizz = makeStyles({
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: "space-evenly",
    },
    subtitle:{
        color: "#262719",
        textAlign: "center",
        padding: "30px"
    },
    title: {
        textAlign: 'center',
        padding: '15px 15px',
        margin: '0 25% 10px 25%',
        backgroundColor: '#4A5602',
        color: '#F6F8D3'
    },
    cardBike: {
        backgroundColor: "F6F8D3",
        position: 'relative',
        marginTop: "5px",
        paddingTop: '35px',
        display: 'flex',
        flexDirection: 'column',
        border: "2px solid #A2996E",
    },
    cardHeader: {
        position: 'absolute',
        top: 1,
        left: 1,
        fontWeight: 'bolder',
        color: "#4A5602"
    },
    price: {
        position: 'absolute',
        top: 1,
        right: 1,
    },
    cardContent: {
        height: "10px",
        border: "2px solid #A2996E",
        width: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        color: "#F6F8D3",
        backgroundColor: '#4A5602',
        padding: "25px 25px",
        fontWeight: 'bolder'
    },
    media: {
        display: 'flex',
        alignSelf: "center",
        backgroundSize: "100%",
        width: 400,
        height: 300,
    }
});

export const useFindOwnBike = makeStyles(theme => ({
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
}));