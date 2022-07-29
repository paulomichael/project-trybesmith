// import express, { NextFunction, Request, Response } from 'express';
import express from 'express';
import ProductController from './controllers/product.controller';

const productController = new ProductController();

const app = express();

app.use(express.json());

app.post('/products', productController.create);
app.get('/products', productController.getAll);

export default app;
