const sharp = require("sharp");
const fs = require('fs');
const path = require('path');
const webp = require('./webpConverter');

var portrait = "imgs/portrait.jpg";
var fox = "imgs/fox.jpg";
var waterfall = "imgs/waterfall.jpg";




function compress(filePath, width, height){
    const type = path.extname(filePath);
    const filename = path.basename(filePath, path.extname(filePath))
    var readStream = fs.createReadStream(filePath);

    switch (type) {
        case ".jpg":
            webp.optimize(readStream, {
                filename: filename,
                size: {
                    width: width,
                    height: height
                }
            });
        
            break;
    
        default:
            break;
    }
}

compress(portrait, 100, 500);
compress(fox, 500, 500);
compress(waterfall, 200, 200);