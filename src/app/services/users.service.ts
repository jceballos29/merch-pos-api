import mongoose from '../../config/database';
import { IUser } from '../../types/user';
import User, { IUserDocument } from '../models/users.model';

const create = async (userData: IUser): Promise<IUserDocument> => {
	return await User.create(userData);
};

const findOne = async (
	query: mongoose.FilterQuery<IUserDocument>,
	options: mongoose.QueryOptions = { lean: true },
): Promise<IUserDocument | null> => {
	return await User.findOne(query, {}, options);
};

const find = async (
	query: mongoose.FilterQuery<IUserDocument>,
	options: mongoose.QueryOptions = { lean: true },
): Promise<IUserDocument[]> => {
	return await User.find(query, {}, options);
};

const update = async (
	query: mongoose.FilterQuery<IUserDocument>,
	update: mongoose.UpdateQuery<IUserDocument>,
	options: mongoose.QueryOptions = { new: true },
): Promise<IUserDocument | null> => {
	return await User.findOneAndUpdate(query, update, options);
};

const remove = async (
	query: mongoose.FilterQuery<IUserDocument>,
): Promise<IUserDocument | null> => {
	return await User.findOneAndDelete(query);
};

export default {
	create,
	findOne,
	find,
	update,
	remove,
};
