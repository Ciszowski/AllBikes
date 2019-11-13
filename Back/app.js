const express = require('express');
const app = express();

const bodyParser = require('body-parser')
const cors = require('cors');
const authRoute = require('./routes/register/auth');
const connection = require('./database/mysql');
const favoriRoute = require('./routes/favori/favori')
const bikeRoute = require('./routes/bikes/dataBicycle');
const quizzRoute = require('./routes/quizz/quizz');
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : false
}));
app.use('/dataBike', bikeRoute);
app.use('/:name', express.static('routes/bikes/imagesBikes'));
app.use('/mon-compte', express.static('routes/quizz/Qimages'));
app.use('/favori', favoriRoute)
app.use('/auth',authRoute);
app.use('/quizz',quizzRoute);
app.use(cors());

app.get('/', (req, err) => {
    $query = "SELECT * from user";
    connection.query($query, (err, results, fields) => {
        if (err)
            throw new Error(err)
        console.log('resultats', results);
        console.log('fields', fields);
    })
});
//evite les intrus qui detectent les apps qui utilisent express
app.disable('x-powered-by');

app.listen(port, (err) => {
    if (err)
        throw new Error(err)
    console.log(`port is listening on ${port}`)
});

