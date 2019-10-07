const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = require('../../database/mysql');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const mdpToken = "chéééééé mooonnn ppppprééééccciiiieeeuuuuxxxxx !!!!!!!"

router.post('/loginIn', (req, res) => {
    const { email, password } = req.body.value
    let checkPass;
    const logData = `SELECT * from user where email= (`+mysql.escape(email)+`)`
    
    connection.query(logData, (err, results) => {
        if (err)
            return err
        else if(!results.length){
            return res.status(500).json({ message: 'user or password incorrect' })
        }else {            
            return new Promise((resolve, reject) => {    
                bcrypt.compare(password, results[0].password,
                    //mot de passe rentré <= VS => le haché ds la db
                    (err, res) => {
                        if (err){
                            reject(err)
                        }
                            checkPass = res
                            resolve(res)
                        })
                    }).then(() => {
                    const { name, surname, email, privilege } = results[0];
                    const payload = {email};
                    const token= jwt.sign( payload, mdpToken, {expiresIn: '2h'})
                    if (checkPass) {
                       return res.status(200).json                    
                            ({
                                'name': name, 'surname': surname, 'email': email,
                                'token': token,'privilege': privilege
                            })
                    }
                    return res.status(500).json({message: 'password incorrect'})
                })
        }
    })
})


router.post('/signIn', (req, res) => {
    const { name, surname, email, password } = req.body.value
    const crypt = bcrypt.hashSync(password, 10);
    const sendData = `INSERT INTO user(email,password,name,surname) VALUES (
       `+ mysql.escape(email) + `, ` + mysql.escape(crypt) + `,
       `+ mysql.escape(name) + `, ` + mysql.escape(surname) + `)`;
    
    connection.query(sendData, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.sqlMessage })
        }
        return res.status(200).json({ message: 'user has been registered !'})
    })
});


router.post('/updateProfile', (req, res)=>{
    console.log('je suis la ')
    const {name,surname, email}= req.body.value;
    const { oldEmail } = req.body;

    const updateData = `UPDATE user SET name='${name}', surname='${surname}', email='${email}' WHERE email='${oldEmail}'`;
    const recupData = `SELECT * from user WHERE email='${email}'`;

    connection.query(updateData, (err)=>{
        if(err){ throw new Error(err)}
        connection.query(recupData, (er, resultat)=>{
          return  res.status(200).json({resultat})
        })
    })
})

router.post('/modifPass', (req, res)=>{
    const { password ,email} = req.body;
    const crypt = bcrypt.hashSync(password, 10);
    const sendData = `UPDATE user SET password='${crypt}' WHERE email='${email}'`

    connection.query(sendData, (err)=>{
        if(err)
            throw new Error(err)
        return res.status(200).json({message: 'Modification du mot de passe effectué'})
    })
})


module.exports = router;