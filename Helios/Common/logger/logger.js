let winston = require('winston');
let dateFormatter = require('../formatter/date_formatter');

function getFormattedDate() {
    let now = new Date();
    return dateFormatter.format(now);
}

function getFormatter(options) {
    return options.timestamp() + ' [' + options.level.toUpperCase() + '] ' + options.message;
}

let consoleTransport = new winston.transports.Console({
    timestamp: getFormattedDate,
    formatter: getFormatter
});

let loggerConfig = {
    transports: [ consoleTransport ]
};

module.exports = new winston.Logger(loggerConfig);