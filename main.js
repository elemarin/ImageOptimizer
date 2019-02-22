const sharp = require("sharp");
const fs = require('fs');

const webp = require('./webpConverter');
const resizer = require('./resizer');

path = "imgs/portrait.jpg";
const readStream = fs.createReadStream(path);

//returns a sharp object
webp.optimize(readStream, {
    filename: "configtest.webp",
    size: {
        width: 500,
        height: 500
    }
});


webp.optimize(readStream, {
    filename: "secondtest.webp",
    size: {
        width: 300,
        height: 100
    }
});

webp.optimize(readStream, {
    filename: "thirdtest.webp",
    size: {
        width: 800,
        height: 50
    }
});