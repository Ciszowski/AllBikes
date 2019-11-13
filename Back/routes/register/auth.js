const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = require('../../database/mysql');
const bcrypt = require('bcrypt');
const tools = require('../bikes/tools');
const jwt = require('jsonwebtoken');
const secret = require('../../private');

router.post('/loginIn', (req, res) => {
    const { email, password } = req.body.value
    const logData = `SELECT * from user where email= (` + mysql.escape(email) + `)`;

    connection.query(logData,async (err, results) => {
        if (err) {
            return err
            //verifie le mot de passe rentré le mot de passe haché stocké dans la database
        } else if (bcrypt.compareSync(password, results[0].password)) {
            const { id_user, name, surname, email, privilege } = results[0];
            jwt.sign({payload : results[0]} , secret, {expiresIn:"2h"},(err,token)=>{
                if(!err){
                    return res.status(200).json
                    ({
                        'id_user': id_user, 'name': name, 'surname': surname, 'email': email,
                        'token': token, 'privilege': privilege
                    })
                }
            })
        } else {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' })
        }
    })
})

router.post('/signIn', (req, res) => {
    const { name, surname, email, password } = req.body.value
    const crypt = bcrypt.hashSync(password, 10);
    const sendData = `INSERT INTO user(email,password,name,surname) VALUES (
       `+ mysql.escape(email) + `, ` + mysql.escape(crypt) + `,
       `+ mysql.escape(name) + `, ` + mysql.escape(surname) + `)`;

    connection.query(sendData, (err) => {
        if (err) {
            return res.status(500).json({ message: err.sqlMessage })
        }
        return res.status(200).json({ message: 'user has been registered !' })
    })
});


router.post('/updateProfile', tools.verifyToken, (req, res) => {
    jwt.verify(req.token, secret, (err, userData) => {
        if (err) {
            //http status : token invalid / expired
            console.log(err)
        } else {
            const { name, surname, email } = req.body.value;
            const payload = { ...userData, name: name, surname: surname, email: email }
            const newToken = jwt.sign({payload} , secret, {expiresIn:"2h"});
            
            const updateData = `UPDATE user SET name='${name}', surname='${surname}', email='${email}' WHERE email='${userData.payload.email}'`;
            const recupData = `SELECT * from user WHERE email='${email}'`;

            connection.query(updateData, (err, result) => {
                if (err) { throw new Error(err) }
                connection.query(recupData, (err, resultat) => {
                    return res.status(200).json({ resultat, newToken })
                })
            })
        }
    })
});

router.post('/modifPass', tools.verifyToken, (req, res) => {
    jwt.verify(req.token, secret, (err) => {
        if (err) {
            console.log(err)
            //http status 498: token invalid / expired
        } else {
            const { password, email } = req.body;
            const crypt = bcrypt.hashSync(password, 10);
            const sendData = `UPDATE user SET password='${crypt}' WHERE email='${email}'`;

            connection.query(sendData, (err) => {
                if (err)
                    throw new Error(err)
                return res.status(200).json({ message: 'Modification du mot de passe effectué' })
            });
        }
    })
})

module.exports = router;