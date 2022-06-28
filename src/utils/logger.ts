import pino from 'pino';

const logger = pino({
    enabled:true,
    transport: {
        target: 'pino-pretty',
        options: {
            crlf:true,
            colorize:true,
            translateTime:true,

        }
    }
});

export { logger };