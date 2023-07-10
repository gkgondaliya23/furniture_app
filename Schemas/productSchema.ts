import mongoose, { mongo } from "mongoose";
import { IProduct } from "../models/productModel";

const productSchema = new mongoose.Schema<IProduct>({
    title : {
        type: String,
        required: true,
        unique: true
    },
    description :{
        type: String,
    },
    price : {
        type: Number,
    },
    images : [{
        type: String,
    }],
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
    }
},
{
    timestamps:true,
    versionKey: false,
});

const ProductCollection = mongoose.model<IProduct>('product', productSchema);

export default ProductCollection;