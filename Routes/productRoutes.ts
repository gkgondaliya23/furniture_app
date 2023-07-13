import { Request, Response, Router } from "express";
import {
    addProduct,
    getAllProduct, 
    getProduct,
    updateProduct,
    deleteProduct
} from '../Controllers/productController';

const productRoutes = Router();

productRoutes.post('/add-product', addProduct);

productRoutes.get('/', getAllProduct);

productRoutes.get('/:productId', getProduct);

productRoutes.put('/:productId', updateProduct);

productRoutes.delete('/:productId', deleteProduct);

export default productRoutes;