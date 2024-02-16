import zennv from 'zennv';
import { z } from 'zod';

const env = z.object({
	NODE_ENV: z.string(),
	PORT: z.number(),
	MONGO_URI: z.string(),
	LOG_LEVEL: z.string(),
	HOSTNAME: z.string(),
	JWT_SECRET: z.string(),
	JWT_EXPIRES_IN: z.string(),
	BCRYPT_SALT: z.number(),
	ORIGIN: z.string(),
});

export default zennv({
	dotenv: true,
	schema: env,
});
