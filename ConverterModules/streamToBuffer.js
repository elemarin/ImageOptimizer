function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
        if (stream.toBuffer instanceof Function) {
            stream.toBuffer(function(err, buffer){
                if(err){
                    reject(err);
                }else{
                    resolve(buffer);
                }
            });            
        } else {
            let buffer = [];
            stream.on("data", function (data) {
                buffer.push(data);
            });

            stream.on("end", function () {
                resolve(Buffer.concat(buffer));
            });            
        }
    });
}

module.exports = streamToBuffer;