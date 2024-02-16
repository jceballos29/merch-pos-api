import { IProductDocument } from '../app/models/product.model';
import { IUserDocument } from '../app/models/users.model';
import { PaymentMethod } from './payment-method';
import { State } from './state';

export interface ISale {
	number: number;
	user: IUserDocument['_id'];
	products: Array<{
		product: IProductDocument['_id'];
		amount: number;
	}>;
	total: number;
	paymentMethod: PaymentMethod;
	state: State;
}
