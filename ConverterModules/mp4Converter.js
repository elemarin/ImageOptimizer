const ffmpeg = require('ffmpeg-stream').ffmpeg;
const fs = require('fs');

const logger = require('./logger');



function optimize(readableStream, config) {
    let writeStream = fs.createWriteStream(`compressed/mp4/${config.filename}.mp4`);

    writeStream.on('finish', err => {
        logger.log("info", `succesfully transcoded ${config.filename} from a .gif to an .mp4`);
    })

    writeStream.on('error', err => {
        logger.log("error", `Error while transcoding ${config.filename} from a .gif to an .mp4`);
    })

    converter = ffmpeg();

    input = converter.input({
        f: 'gif',
        buffer: 'true'
    });

    readableStream.pipe(input);

    converter.output({
            f: 'webm',
            buffer: true
        })
        .pipe(writeStream);

    converter.run();
}

module.exports = {
    optimize: optimize
}