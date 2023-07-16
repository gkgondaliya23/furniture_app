import { Router } from 'express';
import {
    createCart,
    getUserCart
} from '../Controllers/cartController'

const cartRoutes = Router();

cartRoutes.post('/',createCart);

cartRoutes.get('/',getUserCart);

export default cartRoutes;