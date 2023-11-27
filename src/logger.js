import winston from 'winston';
import { config } from "./config.js";
const { combine, printf, prettyPrint, timestamp, colorize } = winston.format;

let configLogger;

const prodLoggerConfig = {
    level: 'info',
    format: combine(
        timestamp({
                ormat: 'MM-DD-YYYY HH:mm:ss',
        }),
        colorize(),
        printf((silly) => `${silly.level} | ${silly.timestamp} | ${silly.message}`),
        printf((debug) => `${debug.level} | ${debug.timestamp} | ${debug.message}`),
        printf((verbose) => `${verbose.level} | ${verbose.timestamp} | ${verbose.message}`),
        printf((http) => `${http.level} | ${http.timestamp} | ${http.message}`),
        printf((info) => `${info.level} | ${info.timestamp} | ${info.message}`),
        printf((warn) => `${warn.level} | ${warn.timestamp} | ${warn.message}`),
        printf((error) => `${error.level} | ${error.timestamp} | ${error.message}`),
        ),
    transports: [
        new winston.transports.File({
            filename: './src/logs/errors.log',
            level:'error'
        }),
        new winston.transports.Console({
            level: 'info'
        })
    ]
};


const devLoggerConfig = {
    level: 'debug',
    format: combine(
        timestamp({
                ormat: 'MM-DD-YYYY HH:mm:ss',
        }),
        colorize(),
        printf((silly) => `${silly.level} | ${silly.timestamp} | ${silly.message}`),
        printf((debug) => `${debug.level} | ${debug.timestamp} | ${debug.message}`),
        printf((verbose) => `${verbose.level} | ${verbose.timestamp} | ${verbose.message}`),
        printf((http) => `${http.level} | ${http.timestamp} | ${http.message}`),
        printf((info) => `${info.level} | ${info.timestamp} | ${info.message}`),
        printf((warn) => `${warn.level} | ${warn.timestamp} | ${warn.message}`),
        printf((error) => `${error.level} | ${error.timestamp} | ${error.message}`),
        ),
    transports: [
        new winston.transports.Console()
    ]
};



if(config.ENVIRONMENT == 'prod'){
    configLogger = prodLoggerConfig
}
else{
    configLogger = devLoggerConfig
}
export const logger = winston.createLogger(configLogger);

