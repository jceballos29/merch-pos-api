import mongoose from '../../config/database';
import { ISale } from '../../types/sale';
import Product from '../models/product.model';
import Sale, { ISaleDocument } from '../models/sales.model';

const create = async ({
	user,
}: {
	user: string;
}): Promise<ISaleDocument> => {
	return await Sale.create({ user });
};

const findOne = async (
	query: mongoose.FilterQuery<ISaleDocument>,
	options: mongoose.QueryOptions = { lean: true },
): Promise<ISaleDocument | null> => {
	return await Sale.findOne(query, {}, options);
};

const find = async (
	query: mongoose.FilterQuery<ISaleDocument>,
	options: mongoose.QueryOptions = { lean: true },
): Promise<ISaleDocument[]> => {
	return await Sale.find(query, {}, options);
};

const update = async (
	query: mongoose.FilterQuery<ISaleDocument>,
	update: mongoose.UpdateQuery<ISaleDocument>,
	options: mongoose.QueryOptions = { new: true },
): Promise<ISaleDocument | null> => {
	return await Sale.findOneAndUpdate(query, update, options);
};

const remove = async (
	query: mongoose.FilterQuery<ISaleDocument>,
): Promise<ISaleDocument | null> => {
	return await Sale.findOneAndDelete(query);
};

// get the total sales amount
const getTotalSales = async (
	query: mongoose.FilterQuery<ISaleDocument>,
): Promise<number> => {
	const sales = await Sale.find(query, { total: 1 });
	return sales.reduce((acc, sale) => acc + sale.total, 0);
};

// get the total sales amount by payment method
const getSalesByPaymentMethod = async (): Promise<
	{ _id: string; total: number }[]
> => {
	return await Sale.aggregate([
		{
			$group: {
				_id: '$paymentMethod',
				total: { $sum: '$total' },
			},
		},
	]);
};


const getSalesByPaymentMethodAndUser = async (
	query: mongoose.FilterQuery<ISaleDocument>,
): Promise<{ _id: string; total: number }[]> => {
	return await Sale.aggregate([
		{
			$match: query,
		},
		{
			$group: {
				_id: '$paymentMethod',
				total: { $sum: '$total' },
			},
		},
	]);
};

const getProductsSold = async (): Promise<
	{ _id: string; total: number }[]
> => {
	return await Sale.aggregate([
		{
			$unwind: '$products',
		},
		{
			$group: {
				_id: '$products.product',
				total: { $sum: '$products.amount' },
			},
		},
	]);
};

const getProductsSoldByUser = async (
	query: mongoose.FilterQuery<ISaleDocument>,
): Promise<{ _id: string; total: number }[]> => {
	return await Sale.aggregate([
		{
			$match: query,
		},
		{
			$unwind: '$products',
		},
		{
			$group: {
				_id: '$products.product',
				total: { $sum: '$products.amount' },
			},
		},
	]);
};

// add product to sale and increase the total
const addProduct = async (
	saleId: string,
	product: string,
	amount: number,
): Promise<ISaleDocument | null> => {
	return await Sale.findOneAndUpdate(
		{ _id: saleId },
		{ $push: { products: { product, amount } } },
		{ new: true },
	);
};


// delete product from sale
const deleteProduct = async (
	saleId: string,
	product: string,
): Promise<ISaleDocument | null> => {
	return await Sale.findOneAndUpdate(
		{ _id: saleId },
		{ $pull: { products: { product } } },
		{ new: true },
	);
};


export default {
	create,
	findOne,
	find,
	update,
	remove,
	getTotalSales,
	getSalesByPaymentMethod,
	getProductsSold,
	getSalesByPaymentMethodAndUser,
	getProductsSoldByUser,
	addProduct,
	deleteProduct,
};
