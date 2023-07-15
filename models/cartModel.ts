import mongoose from "mongoose";

export interface INewCartProduct {
    product: string;
    count: number;
    price: number;
}

export interface ICart {
    _id?: string;
    products: INewCartProduct[];
    total: string;
    tax: string;
    grandTotal: string;
    user: mongoose.Schema.Types.ObjectId;
}