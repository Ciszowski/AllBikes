const express = require('express');
const router = express.Router();
const jsonBikes = __dirname + '/bikes.json';
const objBike = require(jsonBikes);
const tools = require('./tools');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const secret = require('../../private');

router.get("/loadBikes/:name",(req,res)=>{
    const {name} = req.params;
    return res.json(objBike.filter((el)=> el.categorie == name));
})
router.get("/getSingleBike/:name", (req,res)=>{
    const { name } = req.params;
    const modele = name.replace(/[_]+/gi, ' ')
    return res.status(200).json(objBike.filter((el)=> el.model == `${modele}`))
})
router.post('/addNewBike', tools.verifyToken ,(req, res) => {
    jwt.verify(req.token, secret, (err)=>{
        if(!err){
            const{categoryBike,typeOfBike,model,img,year,price,material,brand,size,description}= req.body;
            tools.downloadImg(img, model).then((data) => {
                var imagePath = (data.path).match(/\/\w+.\w+$/gm).join('');
                const dataJson = {
                    categorie: categoryBike,
                    subCategories: typeOfBike,
                    model: model,
                    brand: brand,
                    image: imagePath,
                    material: material,
                    year: year,
                    price: Number(price),
                    size: size,
                    details: description,
                }
                objBike.push(dataJson)
                fs.writeFileSync(jsonBikes, JSON.stringify(objBike))
                return res.status(200).json({ message: 'Vélo ajouté' })
            })
        }
    })
})

module.exports = router;