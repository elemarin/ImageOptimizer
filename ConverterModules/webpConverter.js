const sharp = require("sharp");
const logger = require('./logger');
const fs = require('fs');

/**
 * This function receives a readable stream as a parameter
 * Then converts the stream into a .webP image
 * Finally it returns a readableStream image
 * @param {ReadableStream} image
 * @returns {stream}
 */
function optimize(image, config) {
    let width = config.size.width || undefined;
    let height = config.size.height || undefined;
    let transform = sharp();

    transform.on('finish', err => {
        logger.log("info", `Succesfully compressed ${config.filename}.webP ${err}`);
    })

    transform.on('error', err => {
        logger.log("error", `Failed to compress ${config.filename}.webP ${err}`);
    })

    transform.webp();

    if (config.size) {
        transform.resize(width, height, {
            withoutEnlargement: true
        });
    }

    return image.pipe(transform);
}



module.exports = {
    optimize: optimize
};