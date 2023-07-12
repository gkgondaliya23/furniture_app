import { Request, Response, Router } from "express";
import {
    addProduct,
    getAllProduct, 
    getProduct
} from '../Controllers/productController';

const productRoutes = Router();

productRoutes.post('/addProduct', addProduct);

productRoutes.get('/', getAllProduct);

productRoutes.get('/:productId', getProduct);
export default productRoutes;