import { NextFunction, Request, Response } from 'express';
import {
	DeleteSaleInput,
	GetSaleInput,
	UpdateSaleInput,
	AddProductInput,
	DeleteProductInput,
} from '../../utils/schemas/sales.schema';
import service from '../services/sales.service';
import serviceProduct from '../services/products.service';
import { State } from '../../types/state';

const createHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = res.locals.user;
		const sale = await service.create({ user: user._id });
		res.status(201).json({
			success: true,
			message: 'Sale created successfully',
			data: sale,
		});
	} catch (error) {
		next(error);
	}
};

const getHandler = async (
	req: Request<GetSaleInput['params']>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const sale = await service.findOne({ _id: req.params.id });
		res.status(200).json({
			success: true,
			message: 'Sale found',
			data: sale,
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
		const user = res.locals.user;
		const query = user.role === 'admin' ? {} : { user: user._id };
		const sales = await service.find(query);
		res.status(200).json({
			success: true,
			message: 'Sales found',
			data: sales,
		});
	} catch (error) {
		next(error);
	}
};

const updateHandler = async (
	req: Request<
		UpdateSaleInput['params'],
		{},
		UpdateSaleInput['body']
	>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const sale = await service.update(
			{ _id: req.params.id },
			req.body,
		);
		res.status(200).json({
			success: true,
			message: 'Sale updated successfully',
			data: sale,
		});
	} catch (error) {
		next(error);
	}
};

const deleteHandler = async (
	req: Request<DeleteSaleInput['params']>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const sale = await service.remove({ _id: req.params.id });
		res.status(200).json({
			success: true,
			message: 'Sale deleted successfully',
			data: sale,
		});
	} catch (error) {
		next(error);
	}
};

const getSalesInfoHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = res.locals.user;
		const query =
			user.role === 'admin'
				? { state: State.COMPLETED }
				: { user: user._id, state: State.COMPLETED };
		const totalSales = await service.getTotalSales(query);
		const salesByPaymentMethod =
			await service.getSalesByPaymentMethodAndUser(query);
		const productsSold = await service.getProductsSoldByUser(query);
		res.status(200).json({
			success: true,
			message: 'Sales info found',
			data: {
				totalSales,
				salesByPaymentMethod,
				productsSold,
			},
		});
	} catch (error) {
		next(error);
	}
};

const addProductHandler = async (
	req: Request<
		AddProductInput['params'],
		{},
		AddProductInput['body']
	>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const sale = await service.addProduct(
			req.params.id,
			req.body.product,
			req.body.amount,
		);
		res.status(200).json({
			success: true,
			message: 'Product added to sale',
			data: sale,
		});
	} catch (error) {
		next(error);
	}
};

const deleteProductHandler = async (
	req: Request<DeleteProductInput['params'], {}, {}>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const sale = await service.deleteProduct(
			req.params.id,
			req.params.productId,
		);
		res.status(200).json({
			success: true,
			message: 'Product deleted from sale',
			data: sale,
		});
	} catch (error) {
		next(error);
	}
};

const updateProductsHandler = async () => {}

export default {
	createHandler,
	getHandler,
	listHandler,
	updateHandler,
	deleteHandler,
	getSalesInfoHandler,
	addProductHandler,
	deleteProductHandler,
};
