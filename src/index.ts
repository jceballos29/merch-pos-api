import app from './app';
import env from './config/env';
import { connect } from './config/database';
import { logger } from './utils';

app.listen(env.PORT, async () => {
	try {
		await connect();
		logger.info(`Server running at http://${env.HOSTNAME}:${env.PORT}`);
	} catch (error) {
		logger.error(`Error starting the server: ${error}`);
		process.exit(1);
	}
});
