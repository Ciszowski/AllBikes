const express = require('express');
const router = express.Router();
const objQuizz = require('./Qbikes.json');
const tools= require('../bikes/tools');
const jwt = require('jsonwebtoken');
const secret =require('../../private');
const objBike = require('../bikes/bikes.json')

router.get('/initQuizz',tools.verifyToken,(req, res)=>{
    jwt.verify(req.token, secret,(err)=>{
        if(!err){
            return res.status(200).json({objQuizz});
        }
    })
});

router.post('/resultQuizz',tools.verifyToken,(req,res)=>{
    jwt.verify(req.token, secret,(err)=>{
        if(!err){
            const { modele, price } = req.body
            const result = tools.getResult(modele, price, objBike);
            return res.status(200).json({result})
        }
    })
})
module.exports= router;