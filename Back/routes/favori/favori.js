const express = require('express');
const router = express.Router();
const connection = require('../../database/mysql');
const mysql = require('mysql');

router.post('/addFavori', (req, res) => {
    const { model, id_user } = req.body
    const request = `INSERT INTO favori(id_user,name) VALUES 
                                (`+ mysql.escape(id_user) + `,` + mysql.escape(model) + `)`
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
});

router.get('/deleteFavori/:name&:id', (req, res)=>{
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
});

module.exports = router;
