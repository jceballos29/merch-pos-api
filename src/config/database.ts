import mongoose from 'mongoose';
import env from './env';
import { logger } from '../utils';

export const connect = async (): Promise<void> => {
	try {
		await mongoose.connect(env.MONGO_URI);
		logger.info(
			`Connect to MongoDB: ${mongoose.connection.host}:${mongoose.connection.port}/${mongoose.connection.name}`,
		);
	} catch (error) {
		logger.error('Error connecting to MongoDB:', error);
		process.exit(1);
	}
};

export const disconnect = async () => {
	try {
		await mongoose.disconnect();
		logger.info('Database disconnected');
	} catch (error) {
		logger.error('Database disconnection error', error);
	}
};

export default mongoose;
