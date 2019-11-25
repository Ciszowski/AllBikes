const fs = require('fs');
const request = require('request');

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        return res.sendStatus(403);
    };
}

function getFileType(string) {
    const ext = string.replace(/[a-zA-Z]+\//gi, '.')
    console.log('getfiletype', ext, string)
    return ext
};

async function downloadImg(url, model) {
    return await new Promise((resolve, reject) => {
        request(url).on('response', (res, req) => {
            const ext = getFileType(res.headers['content-type'])
            const pathImg = model.replace(/[' ']/gi, '_') + ext
            const filename = __dirname + '/imagesBikes/' + pathImg; 
            const stream = fs.createWriteStream(filename) 
            res.pipe(stream).on('close', () => {
                resolve(stream)
            })
        })
    }).catch((err) => {
        console.log('error occured' + err)
    })
};

const getFavoris = (objBike, dataSQL) => {
    return objBike.filter((elBike) => {
        const nameBike = dataSQL.map((el) => el.name)
        return nameBike.includes(elBike.model) && elBike
    })
};
const getResult = (modele, price, objBike) => {
    return objBike.filter((elBike) => {
        return (elBike.subCategories === modele) && (elBike.price >= price[0] && elBike.price <= price[1])
    })
}

module.exports = {
    verifyToken,
    downloadImg,
    getFavoris,
    getResult
};