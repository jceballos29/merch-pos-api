import { Router } from 'express';
import { user, validate } from '../../middleware';
import {
	deleteSaleSchema,
	updateSaleSchema,
	getSaleSchema,
	addProductSchema,
	deleteProductSchema,
} from '../../utils/schemas/sales.schema';
import controller from '../controllers/sales.controller';

const router = Router();

router.post('/', user, controller.createHandler);
router.get('/', user, controller.listHandler);
router.get('/info/report', user, controller.getSalesInfoHandler);
router.get(
	'/:id',
	user,
	validate(getSaleSchema),
	controller.getHandler,
);
router.patch(
	'/:id',
	user,
	validate(updateSaleSchema),
	controller.updateHandler,
);
router.delete(
	'/:id',
	user,
	validate(deleteSaleSchema),
	controller.deleteHandler,
);
router.patch(
	'/:id/products',
	user,
	validate(addProductSchema),
	controller.addProductHandler,
);
router.delete(
	'/:id/products/:productId',
	user,
	validate(deleteProductSchema),
	controller.deleteProductHandler,
);

export default router;
