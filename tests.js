const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const fs = require('fs');


// let stream = fs.createReadStream('./spiderman.gif');

// ffmpeg(stream)
//     .inputFormat('gif')


//     .outputOptions([
//         '-movflags faststart',
//         '-pix_fmt yuv420p',
//         '-vf scale=trunc(iw/2)*2:trunc(ih/2)*2',
//         'video.mp4'
//     ])  

// // command.save('./spidermantest.mp4');

let stream = fs.createReadStream('./spiderman.gif');

var proc = ffmpeg(stream)
    .inputOptions([
        '-f gif'
    ])
    .outputOptions([
        '-movflags faststart',
        '-pix_fmt yuv420p',
        '-vf "scale=trunc(iw/2)*2:trunc(ih/2)*2"'])
    .format('mp4')
    .output('out.mp4')
    .run();