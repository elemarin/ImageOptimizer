const ffmpeg = require('ffmpeg-stream').ffmpeg;
const fs = require('fs');

converter = ffmpeg();

input = converter.input({
    f: 'gif',
    buffer: 'true'
});

fs.createReadStream("temp/spiderman.gif").pipe(input);

converter.output("GIF4.mp4", {
    f: 'mp4',
    buffer: true
})

converter.run();