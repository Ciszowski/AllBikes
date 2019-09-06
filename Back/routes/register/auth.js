const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = require('../../database/mysql');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const mdpProvisoire = 'secretttsss'
const mdpToken = "chéééééé mooonnn ppppprééééccciiiieeeuuuuxxxxx !!!!!!!"


router.get('/loginIn', (req, res) => {
    const name = "lunita"
    let checkPass;
    const logData = `SELECT * from test where name= (`+mysql.escape(name)+`)`
    
    connection.query(logData, (err, results) => {
        if (err)
            throw new Error(err)
        
        new Promise((resolve, reject) => {    
            bcrypt.compare(mdpProvisoire, results[0].PASSWORD,
                //mot de passe rentré <= VS => le haché ds la db
                (err, res) => {
                    if (err)
                    reject(err)
                    checkPass = res
                    resolve(res)
                })
            }).then(() => {
                const { name, surname } = results[0];
                const payload = {name};
                const token = jwt.sign( payload, mdpToken, {expiresIn: '1h'})
                if (checkPass) {
                   return res.status(200).json                    
                        ({
                            'name': name, 'surname': surname,
                            'checkPass': checkPass, 'token': 'erzr'
                        })
                }
                res.status(500).send('Identifiant ou mot de passe incorrect')
            })
    })
})


router.get('/signIn', (req, res) => {
    const name = "lunita"
    const surname = "cocotte"
    const crypt = bcrypt.hashSync(mdpProvisoire, 10);

    const sendData = `INSERT INTO test(name,surname,password) VALUES (
        `+ mysql.escape(name) + `, ` + mysql.escape(surname) + `, 
                `+ mysql.escape(crypt) + `)`;
    
    connection.query(sendData, (err, results) => {
        if (err)
            throw new Error(err)
        res.status(200).json({message : 'user has been registered !'})
    })
})

module.exports = router;