import { Request, Response } from 'express';
import * as UserUtils from '../middleware/userUitls';
import { INewCartProduct, ICart } from '../models/cartModel';
import CartCollection from '../Schemas/cartSchema';

/**
 * @usage : Create a new Cart
 * @url : http://localhost:7070/api/carts/
 * @params : products[{product, count, price} ] , total, tax, genadTotal
 * @method : POST
 * @access : PRIVATE
 */
export const createCart = async (req: Request, res: Response) => {
    try {
        const theUser: any = await UserUtils.getUser(req, res);
        if (theUser) {
            const { products, total, tax, grandTotal } = req.body;
            const cartItem = await CartCollection.findOne({ user: theUser._id });
            if (cartItem) {
                return await CartCollection.findOne({ user: theUser._id });
            }
            const newCart: ICart = {
                products: products,
                total: total,
                tax: tax,
                grandTotal: grandTotal,
                user: theUser._id
            }

            const theCart = await new CartCollection(newCart).save();
            if (!theCart) {
                return res.json({ message: 'Cart not created' });
            }
            res.status(201).json({ message: 'Cart created successfully' });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

/**
 * @usage : Get Cart
 * @url : http://localhost:7070/api/carts/
 * @method : GET
 * @access : PRIVATE
 */

export const getUserCart = async (req: Request, res: Response) => {
        try {
            const theUser : any = await UserUtils.getUser(req, res);
            if(theUser){
                const cartItems = await CartCollection.findById(theUser._id);
                res.status(200).json(cartItems);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Server error'});
        }
}
