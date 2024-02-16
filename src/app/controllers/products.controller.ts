import { NextFunction, Request, Response } from 'express';
import {
	CreateProductInput,
	CreateManyProductsInput,
	DeleteProductInput,
	GetProductInput,
	UpdateProductInput,
} from '../../utils/schemas/products.schema';
import service from '../services/products.service';

const createHandler = async (
	req: Request<{}, {}, CreateProductInput['body']>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const product = await service.create(req.body);
		res.status(201).json({
			success: true,
			message: 'Product created successfully',
			data: product,
		});
	} catch (error) {
		next(error);
	}
};

const createManyHandler = async (
	req: Request<{}, {}, CreateManyProductsInput['body']>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const products = await service.createMany(req.body);
		res.status(201).json({
			success: true,
			message: 'Products created successfully',
			data: products,
		});
	} catch (error) {
		next(error);
	}
};

const getHandler = async (
	req: Request<GetProductInput['params']>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const product = await service.findOne({ _id: req.params.id });
		res.status(200).json({
			success: true,
			message: 'Product found',
			data: product,
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
		const products = await service.find(
			{},
			{
				sort: { name: 1 },
			},
		);
		res.status(200).json({
			success: true,
			message: 'Products found',
			data: products,
		});
	} catch (error) {
		next(error);
	}
};

const updateHandler = async (
	req: Request<
		UpdateProductInput['params'],
		{},
		UpdateProductInput['body']
	>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const product = await service.update(
			{ _id: req.params.id },
			req.body,
		);
		res.status(200).json({
			success: true,
			message: 'Product updated successfully',
			data: product,
		});
	} catch (error) {
		next(error);
	}
};

const deleteHandler = async (
	req: Request<DeleteProductInput['params']>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const product = await service.remove({ _id: req.params.id });
		res.status(200).json({
			success: true,
			message: 'Product deleted successfully',
			data: product,
		});
	} catch (error) {
		next(error);
	}
};

export default {
	createHandler,
	createManyHandler,
	getHandler,
	listHandler,
	updateHandler,
	deleteHandler,
};
