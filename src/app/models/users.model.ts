import bcrypt from 'bcrypt';
import mongoose from '../../config/database';
import env from '../../config/env';
import { Role } from '../../types/role';
import { IUser } from '../../types/user';

export interface IUserDocument extends IUser, mongoose.Document {
	createdAt: Date;
	updatedAt: Date;
	comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: {
			type: String,
			required: true,
			enum: Object.values(Role),
			default: Role.User,
		},
	},
	{
		timestamps: true,
		versionKey: false,
		toJSON: {
			transform: function (_doc, ret) {
				delete ret.password;
			},
		},
	},
);

UserSchema.pre('save', async function (next) {
	const user = this;
	if (!user.isModified('password')) {
		return next();
	}
	const salt = await bcrypt.genSalt(env.BCRYPT_SALT);
	const hash = await bcrypt.hash(user.password, salt);
	user.password = hash;
	next();
});

UserSchema.methods.comparePassword = async function (
	password: string,
): Promise<boolean> {
	const user = this;
	return await bcrypt.compare(password, user.password);
};

const User = mongoose.model<IUserDocument>('User', UserSchema);

export default User;
