const sqip = require('sqip');
const fs = require('fs');
const path = require('path');

function optimize(filepath){
    let filename = path.basename(filepath, path.extname(filepath));

        const result = sqip({
        filename: filepath,
        numberOfPrimitives: 500,
        blur: 0
    })
    
    let output = fs.createWriteStream(`${filename}.svg`);
    output.write(result.final_svg);
}

module.exports = {
    optimize: optimize
};