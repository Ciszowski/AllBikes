const express = require('express');
const router = express.Router()
const jsonBikes = __dirname + '/bikes.json';
const objBike = require(jsonBikes);

const fs = require('fs');
const request = require('request');

function getFileType(string) {
    const ext = string.replace(/[a-zA-Z]+\//gi, '.')
    console.log('getfiletype', ext, string)
    return ext
}


async function downloadImg(url, model) {
    console.log('download function', url, model)
    return await new Promise((resolve, reject) => {
        request(url).on('response', (res, req) => {
            const ext = getFileType(res.headers['content-type'])
            const filename = __dirname + '/imagesBikes/' + model.replace(/[' ']/gi, '_') + ext; //create a file (= name)
            const stream = fs.createWriteStream(filename) //write to specific file)
            console.log('image has been saved')
            res.pipe(stream).on('close', () => {
                console.log('réponse end', res.complete)
                resolve(stream)
            })
        })
    }).catch((err) => {
        console.log('error occured' + err)
    })
}

router.post('/addNewBike', (req, res) => {

    const { categoryBike, typeOfBike, model, img, year, price, material, brand, size, description } = req.body;
    console.log('req body', req.body)
    downloadImg(img, model).then((data) => {
        var imagePath = data.path
        const dataJson = {
            model: model,
            brand: brand,
            image: imagePath,
            material: material,
            year: year,
            price: price,
            size: size,
            details: description,
        }
        objBike[categoryBike][typeOfBike].push(dataJson)
        console.log('objBike', objBike)
        fs.writeFileSync(jsonBikes, JSON.stringify(objBike), (err) => {
            if (err)
                throw new Error(err);
            })
        console.log('json modified')
        return res.status(200).json({message : 'Vélo ajouté'})
    })

})

module.exports = router;