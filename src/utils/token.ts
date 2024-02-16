import jwt from 'jsonwebtoken';
import env from '../config/env';

export const generateToken = (
	payload: { id: string },
	options?: jwt.SignOptions,
) => {
	return jwt.sign(payload, env.JWT_SECRET, {
		...(options && options),
		algorithm: 'HS256',
	});
};

export const verifyToken = (token: string) => {
	try {
		const decoded = jwt.verify(token, env.JWT_SECRET);
		return {
			id: (decoded as { id: string }).id,
		};
	} catch (error) {
		return null;
	}
};
