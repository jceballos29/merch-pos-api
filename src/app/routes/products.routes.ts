import { Router } from 'express';
import { role, user, validate } from '../../middleware';
import {
	createProductSchema,
	createManyProductsSchema,
	deleteProductSchema,
	getProductSchema,
	updateProductSchema,
} from '../../utils/schemas/products.schema';
import controller from '../controllers/products.controller';

const router = Router();

router.post(
	'/',
	[user, role(['admin']), validate(createProductSchema)],
	controller.createHandler,
);
router.post(
	'/many',
	[user, role(['admin']), validate(createManyProductsSchema)],
	controller.createManyHandler,
);
router.get('/:id', validate(getProductSchema), controller.getHandler);
router.get('/', controller.listHandler);
router.patch(
	'/:id',
	[user, role(['admin']), validate(updateProductSchema)],
	controller.updateHandler,
);
router.delete(
	'/:id',
	[user, role(['admin']), validate(deleteProductSchema)],
	controller.deleteHandler,
);

export default router;
