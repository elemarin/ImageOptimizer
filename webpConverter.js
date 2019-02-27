const sharp = require("sharp");
const fs = require('fs');
/**
 * This function receives a readable stream as a parameter
 * Then converts the stream into a .webP image
 * Finally it returns a readableStream image
 * @param {ReadableStream} image
 * @returns {stream}
 */
function optimize(image, config) {
    var transformer = sharp();
    transformer.webp();
    
    if(config.size){
        transformer.resize(config.size.width, config.size.height, {withoutEnlargement: true});
    }

    transformer.toFile(`./compressed/${config.filename}.webp`);
    return image.pipe(transformer);
}



module.exports = {
    optimize: optimize
};