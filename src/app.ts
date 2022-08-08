// import express, { NextFunction, Request, Response } from 'express';
import express from 'express';
import ProductController from './controllers/product.controller';
import UserController from './controllers/user.controller';
import OrderController from './controllers/order.controller';

const productController = new ProductController();
const userController = new UserController();
const orderController = new OrderController();

const app = express();

app.use(express.json());

app.post('/products', productController.create);
app.get('/products', productController.getAll);
app.post('/users', userController.create);
app.get('/orders', orderController.getAll);

export default app;
