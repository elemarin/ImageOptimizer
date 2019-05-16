const sqip = require('./ConverterModules/sqip');
const path = require('path');
const fs = require('fs');

function optimizeImagesInPath(directory) {
    const directoryPath = path.join(__dirname, directory);

    fs.readdir(directoryPath, function (err, files) {
        files.forEach(function (file) {
            sqip.optimize(`${directoryPath}/${file}`);
        });
    });
}

optimizeImagesInPath('./images');