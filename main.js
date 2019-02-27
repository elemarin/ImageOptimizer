const sharp = require("sharp");
const fs = require('fs');
const path = require('path');
const webp = require('./webpConverter');
const jpg = require('./jpgConverter');

var portrait = "imgs/portrait.jpg";
var fox = "imgs/fox.jpg";
var waterfall = "imgs/waterfall.jpg";




function optimize(filePath, width, height){
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

            jpg.optimize(readStream, {
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

optimize(portrait, 5000, 5000);
optimize(fox, 230, 150);
optimize(waterfall, 230, 150);

// var miniwaterfall = "compressed/fox.webp";

// optimize(miniwaterfall, 800, 800);