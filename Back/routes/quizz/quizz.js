const express = require('express');
const router = express.Router();
const objQuizz = require('./Qbikes.json');

router.get('/initQuizz', (req, res)=>{
    res.status(200).json({objQuizz});
})

module.exports= router;