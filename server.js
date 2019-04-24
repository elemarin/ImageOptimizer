const path = require('path');
const express = require('express');
const fs = require('fs');
const webp = require('./ConverterModules/webpConverter');
const jpg = require('./ConverterModules/jpgConverter');
const cache = require('./ConverterModules/cacheService');
// /**
//  *
//  *
//  * @param {string} path file name and location
//  * @param {string} extension file extension
//  * @returns
//  */
// function getFilePath(path, extension){
//     let filename = path.replace(extension, '');

//     return glob.sync(`${filename}.*`)[0] || "";

// };

//used to find a photo with a specific name, that might not match the extension
//let fullPath = getFilePath(file, extension);


function saveImage(image, config) {
    let fullPath = `./compressed/${config.extension.replace(".", "")}/${config.filepath}`;
    //fullPath.replace(`${config.filename}.${config.extension}`, "");
    fullPath = path.dirname(fullPath);
    fs.mkdir(fullPath, {
        recursive: true
    }, function (err) {
        if (err) {
            throw err;
        }


        let writeStream = fs.createWriteStream(`${fullPath}/${config.filename}_${config.size.width}x${config.size.height}${config.extension}`);
        image.pipe(writeStream);
    });

}

var dir = path.join(__dirname, 'public');

server = express();

server.get('*', function (req, res) {

    let extension = path.extname(req.path);
    let filename = path.basename(req.path, path.extname(req.path));
    let file = path.join(dir, req.path);
    let type = `image/${extension}`.replace(".", "");

    //Parse the query string parameters
    let width = parseInt(req.query.width) || parseInt(req.query.w) || parseInt(req.query.maxwidth);
    let height = parseInt(req.query.height) || parseInt(req.query.h) ||parseInt(req.query.maxheight);

    //load the image into a readStream
    let image = fs.createReadStream(file);

    let supportsWebp = req.accepts().find(function (element) {
        return element == "image/webp";
    });

    image.on('open', function () {

        let config = {
            filename: filename,
            filepath: req.path,
            extension: extension.replace(".", ""),
            size: {
                width: width,
                height: height
            }
        }

        let optimizedImage;

        switch (extension) {
            case ".jpg" || ".jpeg":
                optimizedImage = jpg.optimize(image, config);
                break;
            /*if(supportsWebp){
                config.extension = ".webp";
                type = "image/webp";
                optimizedImage = webp.optimize(image, config);
            }
            else{
            } */

            default:
                //return the HD image if the extension doesn't match any
                optimizedImage = image;
                break;
        }

        res.set('Content-Type', type);
        optimizedImage.pipe(res);
        //saveImage(optimizedImage, config);

    });

    image.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
});



server.listen(process.env.PORT || 8000, () => {
    console.log("Server started!");
})