const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toulouse',
    database: 'allbikes'
})

module.exports = connection