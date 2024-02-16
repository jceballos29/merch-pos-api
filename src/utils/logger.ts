import pino from 'pino';
import env from '../config/env';

export const logger = pino({
	base: {
		pid: process.pid,
		hostname: env.HOSTNAME,
	},
	level: env.LOG_LEVEL || 'info',
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true,
			crlf: false,
			errorLikeObjectKeys: ['err', 'error'],
			errorProps: '',
			levelFirst: false,
			messageKey: 'msg',
			translateTime: 'SYS:standard',
			ignore: 'pid,hostname',
		},
	},
	timestamp: pino.stdTimeFunctions.isoTime,
});
