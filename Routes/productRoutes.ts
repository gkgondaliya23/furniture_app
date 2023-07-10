import { Request, Response, Router } from "express";
import {
    addProduct,
    getAllProduct
} from '../Controllers/productController';

const productRoutes = Router();

productRoutes.post('/addProduct', addProduct);

productRoutes.get('/', getAllProduct);

export default productRoutes;