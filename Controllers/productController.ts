import { Request, Response } from "express";
import ProductCollection from "../Schemas/productSchema";
import * as UserUtils from "../middleware/userUitls";
import { IProduct } from "../models/productModel";

/**
 * @usage : Add Product 
 * @url : "https://localhost:7070/api/products/addProduct"
 * @param : title, description, price, image, category, subcategory
 * @method : POST
 * @access : Private 
 */

export const addProduct = async (req: Request, res: Response) => {
    try {
        const { title, description, price, images, category, subCategory } = req.body;

        const userObj: any = await UserUtils.getUser(req, res);
        if (userObj) {
            const isProduct: IProduct | undefined | null = await ProductCollection.findOne({ title: title });
            if (isProduct) {
                return res.status(200).json({ message: 'Product already exists' });
            }

            const newProduct: IProduct = {
                title,
                description,
                price,
                images,
                userId: userObj._id,
                category,
                subCategory
            }
            const createProduct = await new ProductCollection(newProduct).save();
            if (createProduct) {
                res.status(201).json({ message: 'Product added successfully' });
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * @usage : Get All Products 
 * @url : "https://localhost:7070/api/products/"
 * @method : GET
 * @access : Public 
 */

export const getAllProduct =async (req:Request, res:Response) => {
    try {
        const userObj : any = await UserUtils.getUser(req, res);
        if(userObj){
            const products : IProduct[] = await ProductCollection.find();

            res.status(200).json(products);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * @usage : Get Product 
 * @url : "https://localhost:7070/api/products/:productId"
 * @method : GET
 * @access : Public 
 */

export const getProduct =async (req:Request, res:Response) => {
    try {
        const userObj : any = await UserUtils.getUser(req, res);
        if(userObj){
            const product : IProduct | undefined | null = await ProductCollection.findById(req.params.productId);
            res.status(200).json(product);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};
