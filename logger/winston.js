const winston = require('winston')
const path = require('path')

module.exports = (label) => {
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.label({label}),
                winston.format.colorize({colors: {info: 'yellow', error: 'red'}, all: true})
            )
        }),

        new winston.transports.File({
            level: 'error',
            filename: path.join(process.cwd(), 'logs', 'error.txt'),
            format: winston.format.combine(
                winston.format.label({label}),
                winston.format.json({space: 6}),
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                })
            )
        })
    ]
})


    return {
        info: (error) => {
            return logger.info(error)
        },
        error: (error) => {
            return logger.error(error)
        }
    }
}

