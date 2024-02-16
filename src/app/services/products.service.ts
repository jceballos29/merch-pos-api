import mongoose from '../../config/database';
import { IProduct } from '../../types/product';
import Product, { IProductDocument } from '../models/product.model';

const create = async (productData: IProduct): Promise<IProductDocument> => {
  return await Product.create(productData);
};

const createMany = async (productData: IProduct[]): Promise<IProductDocument[]> => {
  return await Product.insertMany(productData);
};

const findOne = async (
  query: mongoose.FilterQuery<IProductDocument>,
  options: mongoose.QueryOptions = { lean: true },
): Promise<IProductDocument | null> => {
  return await Product.findOne(query, {}, options);
}

const find = async (
  query: mongoose.FilterQuery<IProductDocument>,
  options: mongoose.QueryOptions = { lean: true },
): Promise<IProductDocument[]> => {
  return await Product.find(query, {}, options);
}

const update = async (
  query: mongoose.FilterQuery<IProductDocument>,
  update: mongoose.UpdateQuery<IProductDocument>,
  options: mongoose.QueryOptions = { new: true },
): Promise<IProductDocument | null> => {
  return await Product.findOneAndUpdate(query, update, options);
}

const remove = async (
  query: mongoose.FilterQuery<IProductDocument>,
): Promise<IProductDocument | null> => {
  return await Product.findOneAndDelete(query);
}

export default {
  create,
  createMany,
  findOne,
  find,
  update,
  remove,
};
