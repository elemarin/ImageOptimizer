const sharp = require("sharp");


function resize(sharpImage, width, height){
    sharpImage.resize(width, height)
}


module.exports = {
    resize: resize
}