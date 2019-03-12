const path = require('path');
const express = require('express');
const fs = require('fs');
const webp = require('./ConverterModules/webpConverter');
const glob = require('glob');


function getFilePath(path, extension){
    let filename = path.replace(extension, '');
    
    return glob.sync(`${filename}.*`)[0] || "";

};

var dir = path.join(__dirname, 'imgs');

server = express();

server.get('*', function (req, res) {

    let extension = path.extname(req.path);
    let type =`image/${extension}`.replace(".", "");

    let filename = path.basename(req.path, path.extname(req.path));
    let file = path.join(dir, req.path);

    //Parse the query string parameters
    let width = parseInt(req.query.width);
    let height = parseInt(req.query.height);

    let fullPath = getFilePath(file, extension);

    let image = fs.createReadStream(fullPath);
    image.on('open', function () {

        res.set('Content-Type', "image/webp");

        let optimizedImage = webp.optimize(image, {
            filename: filename,
            size: {
                width: width,
                height: height
            }
        })
        
        optimizedImage.pipe(res);
        
        let writeStream = fs.createWriteStream(`./compressed/webp/${filename}_${width}x${height}.webp`);
        optimizedImage.pipe(writeStream);
        

    });

    image.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
});



server.listen(8000, () => {
    console.log("Server started!");
})