const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Toulouse84',
    database: 'allbikes'
})

module.exports = connection