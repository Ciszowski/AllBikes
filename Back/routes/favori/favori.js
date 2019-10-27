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
                res.status(500).json({ message: err.sqlMessage })
            } else {
                return res.status(200).json({ message: 'Vélo ajouté aux favoris !' })
            }
        } catch (error) {
            console.log('some error occured', error)
        }
    })
});

router.get('/getFavori/:id', (req, res)=>{
    const { id } = req.params;
    const request = `SELECT * from favori WHERE  id_user=${id}`;

    connection.query(request, (err, results)=>{
        try{
            console.log('resultats',results)
        }catch(err){
            console.log('Some Error occured', err)
        }
        res.json({'ok':'ok'})
    })
})

module.exports = router;
