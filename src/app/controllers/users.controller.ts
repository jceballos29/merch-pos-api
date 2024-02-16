import { NextFunction, Request, Response } from 'express';
import {
	CreateUserInput,
	DeleteUserInput,
	GetUserInput,
	UpdateUserInput,
} from '../../utils/schemas/users.schema';
import service from '../services/users.service';

const createHandler = async (
	req: Request<{}, {}, CreateUserInput['body']>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = await service.create(req.body);
		res.status(201).json({
			success: true,
			message: 'User created successfully',
			data: user,
		});
	} catch (error) {
		next(error);
	}
};

const getHandler = async (
	req: Request<GetUserInput['params']>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = await service.findOne({ _id: req.params.id });
		res.status(200).json({
			success: true,
			message: 'User found',
			data: user,
		});
	} catch (error) {
		next(error);
	}
};

const listHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const users = await service.find({});
		res.status(200).json({
			success: true,
			message: 'Users found',
			data: users,
		});
	} catch (error) {
		next(error);
	}
};

const updateHandler = async (
	req: Request<
		UpdateUserInput['params'],
		{},
		UpdateUserInput['body']
	>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = await service.update(
			{ _id: req.params.id },
			req.body,
		);
		res.status(200).json({
			success: true,
			message: 'User updated successfully',
			data: user,
		});
	} catch (error) {
		next(error);
	}
};

const deleteHandler = async (
	req: Request<DeleteUserInput['params']>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = await service.remove({ _id: req.params.id });
		res.status(200).json({
			success: true,
			message: 'User deleted successfully',
			data: user,
		});
	} catch (error) {
		next(error);
	}
};

export default {
	createHandler,
	getHandler,
	listHandler,
	updateHandler,
	deleteHandler,
};
