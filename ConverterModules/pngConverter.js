const sharp = require("sharp");

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
    
    if(config.size){
        transformer.resize(config.size.width, config.size.height, {withoutEnlargement: true});
    }

    transformer.toFile(`./compressed/png/${config.filename}.png`);
    return readableStream.pipe(transformer);
}

module.exports = {
    optimize: optimize
};