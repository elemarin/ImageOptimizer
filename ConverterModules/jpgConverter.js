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
    transformer.jpeg({
        progressive: true
    });
    
    transformer.on('finish', err => {
        logger.log("info", `succesfully compressed ${config.filename}.jpeg`);
    })

    transformer.on('error', err => {
        logger.log("error", `Failed to compress ${config.filename}.jpeg`);
    })

    if(config.size){
        transformer.resize(config.size.width, config.size.height, {withoutEnlargement: true});
    }

    transformer.toFile(`./compressed/jpg/${config.filename}.jpg`);
    return readableStream.pipe(transformer);
}

module.exports = {
    optimize: optimize
};