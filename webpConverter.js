const sharp = require("sharp");
const fs = require('fs');
/**
 * This function receives a readable stream as a parameter
 * Then converts the stream into a .webP image
 * Finally it returns a readableStream image
 * @param {stream} readableStream
 * @returns {stream}
 */
function convert(readableStream) {

    var transformer = sharp();
    transformer.webp();
    transformer.toFile("test.webp");

    return readableStream.pipe(transformer);
}

module.exports = {
    convert: convert
};