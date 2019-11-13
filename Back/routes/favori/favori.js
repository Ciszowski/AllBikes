const express = require('express');
const router = express.Router();
const connection = require('../../database/mysql');
const mysql = require('mysql');
const tools = require('../bikes/tools');
const jwt = require('jsonwebtoken');
const secret = require('../../private');
const objBike = require('../bikes/bikes.json')

router.post('/addFavori',tools.verifyToken, (req, res) => {
    jwt.verify(req.token,secret,(err)=>{
        if(!err){
            const { model, id_user } = req.body
            const request = `INSERT INTO favori(id_user,name) VALUES 
                                        (`+ mysql.escape(id_user) + `,` + mysql.escape(model) + `)`;
            connection.query(request, (err) => {
                try {
                    if (err) {
                        return res.status(500).json({ message: err.sqlMessage });
                    }
                    return res.status(200).json({ message: 'Vélo ajouté aux favoris !' });
                    
                } catch (error) {
                    console.log('some error occured', error);
                }
            });
        }
    })
});

router.get('/deleteFavori/:name&:id',tools.verifyToken, (req, res)=>{
    jwt.verify(req.token, secret, (err)=>{
        if(!err){
            const { name ,id } = req.params;
            const request= `DELETE FROM favori where name like '${name}' and id_user='${id}'`;
        
            connection.query(request, (err)=>{
                try {
                    if (err) {
                        return res.status(500).json({ message: err.sqlMessage });
                    } 
                    return res.status(200).json({message: 'Vélo supprimé'});
                    
                } catch (error) {
                    console.log('some error occured', error);
                };
            });
        }
    })
});

router.get('/getFavori/:id', tools.verifyToken, (req, res)=>{
    jwt.verify(req.token, secret,(err)=>{
        if(!err){
            const { id } = req.params;
            const request = `SELECT * from favori WHERE  id_user=${id}`;
        
            connection.query(request, (err, results)=>{
                try{            
                    res.json({results: tools.getFavoris(objBike, results)})
                }catch(err){
                    console.log('Some Error occured', err);
                }
            })
        }
    })
});
module.exports = router;
