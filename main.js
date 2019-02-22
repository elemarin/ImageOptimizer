const sharp = require("sharp");
const fs = require('fs');

const webp = require('./webpConverter');
const resizer = require('./resizer');

path = "imgs/portrait.jpg";
const readStream = fs.createReadStream(path);

//returns a sharp object
var image = webp.convert(readStream);

resizer.resize(image, 230, 150);

image.toFile("test.webp");


// resizer.resize(image, 1000, 150);

// image.toFile("test2.webp");



