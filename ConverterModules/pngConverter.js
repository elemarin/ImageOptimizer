const sharp = require("sharp");
const logger = require('./logger');

/**
 * This function receives a readable stream as a parameter
 * Then converts the stream into a .png image
 * Finally it returns a readableStream image
 * @param {stream} readableStream
 * @returns {stream}
 */
function optimize(readableStream, config) {

    let transformer = sharp();
    transformer.png({
        progressive: true, 
        quality: 80
    })

    transformer.on('finish', err => {
        logger.log("info", `succesfully transcoded ${config.filename}.png`);
    })

    transformer.on('error', err => {
        logger.log("error", `Failed to transcode ${config.filename}.png`);
    })
    
    if(config.size){
        transformer.resize(config.size.width, config.size.height, {withoutEnlargement: true});
    }

    transformer.toFile(`./compressed/png/${config.filename}.png`);

    transformer.emit('error', new Error('failed'));
    return readableStream.pipe(transformer);
}

module.exports = {
    optimize: optimize
};