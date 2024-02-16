import mongoose from '../../config/database';
import { ISale } from '../../types/sale';
import { PaymentMethod } from '../../types/payment-method';
import { State } from '../../types/state';

export interface ISaleDocument extends ISale, mongoose.Document {
	createdAt: Date;
	updatedAt: Date;
}

const SaleSchema = new mongoose.Schema(
	{
		number: { type: Number, unique: true },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
				amount: { type: Number, required: true },
			},
		],
		total: { type: Number, default: 0},
		paymentMethod: {
			type: String,
			required: true,
			enum: Object.values(PaymentMethod),
			default: PaymentMethod.CASH,
		},
		state: {
			type: String,
			required: true,
			enum: Object.values(State),
			default: State.PROCESSING,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

SaleSchema.pre('save', async function (next) {
	const sale = this as ISaleDocument;
	if (!sale.number) {
		const lastSale = await Sale.findOne(
			{},
			{},
			{ sort: { createdAt: -1 } },
		);
		sale.number = lastSale ? lastSale.number + 1 : 1;
	}
	next();
});

const Sale = mongoose.model<ISaleDocument>('Sale', SaleSchema);

export default Sale;
