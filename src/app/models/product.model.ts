import mongoose from '../../config/database';
import { IProduct } from '../../types/product';

export interface IProductDocument
	extends IProduct,
		mongoose.Document {
	createdAt: Date;
	updatedAt: Date;
}

const ProductSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

const Product = mongoose.model<IProductDocument>(
	'Product',
	ProductSchema,
);

export default Product;
