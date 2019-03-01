const sharp = require("sharp");
const fs = require('fs');
const GIFEncoder = require('gifencoder');
/**
 * This function receives a readable stream as a parameter
 * Then converts the stream into a .png image
 * Finally it returns a readableStream image
 * @param {stream} readableStream
 * @returns {stream}
 */
function optimize(readableStream, config) {

    // let transformer = sharp();
    // transformer.gi

    // if(config.size){
    //     transformer.resize(config.size.width, config.size.height, {withoutEnlargement: true});
    // }

    // transformer.toFile(`./compressed/png/${config.filename}.png`);
    // return readableStream.pipe(transformer);


    const encoder = new GIFEncoder(config.size.width, config.size.height);
    console.log("holis");
    readableStream.pipe(encoder.createWriteStream({
            quality: 10
        }))
        .pipe(fs.createWriteStream('myanimated.gif'));
}

module.exports = {
    optimize: optimize
};