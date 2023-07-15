import mongoose from "mongoose";
import { ICart, INewCartProduct } from "../models/cartModel";

const cartSchema = new mongoose.Schema<ICart>({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        },
        count: {
            type: Number,
            default : 1
        },
        price: {
            type: Number,
        }
    }],

    total:{
        type: String,
    }, 
    tax:{
        type: String,
    }, 
    grandTotal:{
        type: String,
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' 
    }
},
{
    timestamps: true,
    versionKey: false,
});


const CartCollection = mongoose.model<ICart>('Cart',cartSchema);

export default CartCollection;