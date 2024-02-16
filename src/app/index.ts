import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookies from 'cookie-parser';
import morgan from 'morgan';
import { error, deserialize } from '../middleware';
import users from './routes/users.routes';
import auth from './routes/auth.routes';
import products from './routes/products.routes';
import sales from './routes/sales.routes';
import env from '../config/env';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	cors({
		origin: ['http://localhost:5173/', 'http://localhost:3000', 'http://localhost:8080', 'http://localhost:4173', env.ORIGIN],
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
	}),
);
app.use(cookies());
app.use(morgan('dev'));

app.use(deserialize);

app.get('/', (_req: Request, res: Response) => {
	res.status(200).json({
		message: 'Welcome to the API',
	});
});

app.get('/health', (_req: Request, res: Response) => {
	res.status(200).json({ message: 'OK' });
});

app.use('/users', users);
app.use('/auth', auth);
app.use('/products', products);
app.use('/sales', sales);

app.use(error);

app.use((_req: Request, res: Response) => {
	res.status(404).json({ message: 'Not found' });
});

export default app;
