const fs = require('fs');
const path = require('path');
const webp = require('./ConverterModules/webpConverter');
const jpg = require('./ConverterModules/jpgConverter');
const png = require('./ConverterModules/pngConverter');
const mp4 = require('./ConverterModules/mp4Converter');

const logger = require('./ConverterModules/logger');

var portrait = "imgs/portrait.jpg";
// var fox = "imgs/fox.jpg";
// var waterfall = "imgs/waterfall.jpg";

function optimize(filePath, width, height) {
    const type = path.extname(filePath);
    const filename = path.basename(filePath, path.extname(filePath));

    var readStream = fs.createReadStream(filePath);

    readStream.on('error', err => {
        console.log('unable to open file: ' + filePath);

        logger.log('error', 'unable to open file: ' + filePath);
    })




    switch (type) {
        case ".jpg":
            webp.optimize(readStream, {
                filename: filename,
                size: {
                    width: width,
                    height: height
                }
            });

            jpg.optimize(readStream, {
                filename: filename,
                size: {
                    width: width,
                    height: height
                }
            });

            png.optimize(readStream, {
                filename: filename,
                size: {
                    width: width,
                    height: height
                }
            });


            break;

        case ".gif":
            mp4.optimize(readStream, {
                filename: filename,
                size: {
                    width: width,
                    height: height
                }
            });
        default:
            break;
    }
}

function optimizeImagesInPath(directory) {
    const directoryPath = path.join(__dirname, directory);

    fs.readdir(directoryPath, function (err, files) {
        files.forEach(function (file) {
            optimize(directoryPath + "/" + file, 500, 500);
        });
    });
}

optimizeImagesInPath('./imgs');