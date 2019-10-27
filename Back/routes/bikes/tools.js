const fs = require('fs');
const request = require('request');

function getFileType(string) {
    const ext = string.replace(/[a-zA-Z]+\//gi, '.')
    console.log('getfiletype', ext, string)
    return ext
};

async function downloadImg(url, model) {
    return await new Promise((resolve, reject) => {
        request(url).on('response', (res, req) => {
            const ext = getFileType(res.headers['content-type'])
            const filename = '/' + model.replace(/[' ']/gi, '_') + ext; //create a file (= name)
            const stream = fs.createWriteStream(filename) //write to specific file
            res.pipe(stream).on('close', () => {
                resolve(stream)
            })
        })
    }).catch((err) => {
        console.log('error occured' + err)
    })
};

module.exports = {
    downloadImg
}