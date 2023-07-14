import {Request, Response} from 'express';
import { ICategory, ISubCategory } from '../models/categoryModel';
import {CategoryColletction, SubCategoryColletion} from '../Schemas/categorySchema';
import * as UserUtils from '../middleware/userUitls';

/**
 * @usage : Create a new category
 * @url : http://localhost:7070/api/categories
 * @params : name, description
 * @method : POST,
 * @access : PRIVATE
 */
export const createCategory = async (req : Request, res : Response) => {
    try {
        const {name, description} = req.body;
        const theUser = await UserUtils.getUser(req,res);
        if(theUser){
            const categoryObj : ICategory | undefined | null = await CategoryColletction.findOne({name: name});
            if(categoryObj){
                return res.status(401).send({message: 'Category already exists'});
            }

            const newCategory : ICategory = {
                name: name,
                description: description,
                subcategories : [] as ISubCategory[]
            };

            const category = await new CategoryColletction(newCategory).save();
            res.status(201).json({category, message: 'new category created'});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server error'});
    }
};

/**
 * @usage : Create a new Sub category
 * @url : http://localhost:7070/api/categories/:categoryId
 * @params : name, description
 * @method : POST,
 * @access : PRIVATE
 */
export const createSubCategory =async (req : Request, res: Response) => {
    try {
        const categoryId = req.params.categoryId;
        const {name, description} = req.body;
        const theUser = await UserUtils.getUser(req, res);
        if(theUser) {
            const isCategory : any = await CategoryColletction.findById(categoryId);
            if(!isCategory) {
                return res.status(404).json({message:'Category not found'});
            }

            let isSubCategory : any = await CategoryColletction.findOne({name : name});
            if(isSubCategory){
                return res.status(401).json({message: 'Sub category already exists'});
            }

            let subCategories : any = await SubCategoryColletion.create({
                name : name,
                description: description
            });

            subCategories.save();
            res.status(201).json({subCategories, message: 'subCategories created'});
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server error'});
    }
};

/**
 * @usage : Get category
 * @url : http://localhost:7070/api/categories/
 * @method : GET,
 * @access : PUBLIC
 */

export const getAllCategory = async( req : Request, res : Response) => {
    try {
        const theUser = await UserUtils.getUser(req, res);
        if(theUser){
            const category : any = await CategoryColletction.find();
                return res.status(200).json({category});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Server error'});
    }
}