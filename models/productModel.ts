import mongoose from "mongoose";

export interface IProduct {
    title?: String,
    description?: String,
    price?: Number,
    images?: String,
    userId?: mongoose.Schema.Types.ObjectId
    category?: mongoose.Schema.Types.ObjectId,
    subCategory?: mongoose.Schema.Types.ObjectId,
}