import User from '../models/users.model';

const validatePassword = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {

	const user = await User.findOne({ email });

	if (!user) {
		return false;
	}

	const isValid = await user.comparePassword(password);
	return isValid ? user : false;
};

export default {
	validatePassword,
};
