const path = require('path');
const express = require('express');
const fs = require('fs');
const jpg = require('./ConverterModules/jpgConverter');
const png = require('./ConverterModules/pngConverter');
const svg = require('./ConverterModules/svgConverter');
const webp = require('./ConverterModules/webpConverter');
const cache = require('./ConverterModules/cacheService');
const streamToBuffer = require('./ConverterModules/streamToBuffer');
const resizeProfiles = require('./resizer_profiles.json');

var dir = path.join(__dirname, 'public');

server = express();

server.get('*', async function (req, res) {
    let extension = path.extname(req.path);
    let filename = path.basename(req.path, path.extname(req.path));
    let file = path.join(dir, req.path);
    let resizeMethod = "BestFit";
    let profileName = filename.substring(0, filename.indexOf("_")) || undefined;

    //Parse the query string parameters
    let width = parseInt(req.query.width) || parseInt(req.query.w) || parseInt(req.query.maxwidth);
    let height = parseInt(req.query.height) || parseInt(req.query.h) || parseInt(req.query.maxheight);
    let quality = parseInt(req.query.quality) || 80;
    let mode = req.query.mode === "crop" ? "cover" : "contain";
    let format = req.query.format || extension.replace('.', '');
    let type = `image/${format}`;

    //set client-side cache to 1 day
    res.set('Cache-Control', 'max-age=86400');

    //means the url comes with a resize parameter
    if (profileName) {
        filename = filename.replace(`${profileName}_`, "");
        file = file.replace(`${profileName}_`, "");
        let profile = resizeProfiles[profileName];

        if (profile) {
            width = profile.width;
            height = profile.height;
            resizeMethod = profile.resizeMethod;
        }

    }

    //try to fetch the image from cache
    let cachedImage = cache.getValue(req.originalUrl);

    if (cachedImage !== undefined) {
        res.set('Content-Type', cachedImage.type);
        res.send(cachedImage.image);
    } else {
        //load the image into a readStream
        let image = fs.createReadStream(file);

        image.on('error', function () {
            res.set('Content-Type', 'text/plain');
            res.status(404).end('Not found');
        });

        let config = {
            filename: filename,
            filepath: req.path,
            extension: extension.replace(".", ""),
            resizeMethod: resizeMethod,
            mode: mode,
            format: format,
            quality: quality,
            size: {
                width: width,
                height: height
            }
        }
        let optimizedImage;

        switch (extension) {
            case ".jpg" || ".jpeg":
                optimizedImage = jpg.optimize(image, config);
                break;
            case ".png":
                optimizedImage = png.optimize(image, config);
                break;
            case ".webp":
                optimizedImage = webp.optimize(image, config);
                break;
            case ".svg":
                if (req.query.format) {
                    optimizedImage = svg.optimize(image, config);
                } else {
                    type = "image/svg+xml";
                    optimizedImage = image;
                }

                break;
            default:
                //return the HD image if the extension doesn't match any
                optimizedImage = image;
                break;
        }

        res.set('Content-Type', type);
        optimizedImage.pipe(res);



        res.on('finish', async () => {
            cache.storeValue(req.originalUrl, {
                type: type,
                image: await streamToBuffer(optimizedImage)
            });
        })
    }

});

server.listen(process.env.PORT || 8082, () => {
    console.log("Server started!");
})