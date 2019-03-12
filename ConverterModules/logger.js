const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {
        service: 'user-service'
    },
    transports: [
        //
        // Write to all logs to `combined.log` 
        // Write all errors to `error.log`.
        //
        new winston.transports.File({
            filename: 'logs/errors.log',
            level: 'error'
        }),
        new winston.transports.File({
            filename: 'logs/logs.log'
        })
    ]
});


function log(level, message){
    logger.log(level, message);
}


module.exports = {
    log: log
}