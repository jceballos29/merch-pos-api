import controller from '../controllers/auth.controller';
import { Router } from 'express';
import { validate, user } from '../../middleware';
import { loginSchema } from '../../utils/schemas/auth.schema';

const router = Router();

router.post('/login', validate(loginSchema), controller.loginHandler);
router.post('/logout', controller.logoutHandler);
router.get('/me', user, controller.me);

export default router;
