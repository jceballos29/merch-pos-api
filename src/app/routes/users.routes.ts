import { Router } from 'express';
import { role, user, validate } from '../../middleware';
import {
	createUserSchema,
	deleteUserSchema,
	getUserSchema,
	updateUserSchema,
} from '../../utils/schemas/users.schema';
import controller from '../controllers/users.controller';

const router = Router();

router.post(
	'/',
	[user, role(['admin']), validate(createUserSchema)],
	controller.createHandler,
);
router.get('/:id', validate(getUserSchema), controller.getHandler);
router.get('/', controller.listHandler);
router.patch(
	'/:id',
	[user, role(['admin']), validate(updateUserSchema)],
	controller.updateHandler,
);
router.delete(
	'/:id',
	[user, role(['admin']), validate(deleteUserSchema)],
	controller.deleteHandler,
);

export default router;
