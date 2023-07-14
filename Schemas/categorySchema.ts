import mongoose from "mongoose";
import { ICategory, ISubCategory } from "../models/categoryModel";

// child categories
const subCategoryies = new mongoose.Schema<ISubCategory>({
    name: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
    },
});

export const SubCategoryColletion = mongoose.model<ISubCategory>('SubCategory', subCategoryies);


// parent category
const categories = new mongoose.Schema<ICategory>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description : {
        type: String,
    },
    subcategories : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
    }]
},
{
    timestamps:true,
    versionKey: false,
});

export const CategoryColletction = mongoose.model<ICategory>('Category', categories);