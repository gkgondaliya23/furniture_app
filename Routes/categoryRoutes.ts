import { Router } from "express";
import{
    createCategory,
    createSubCategory,
    getAllCategory
} from '../Controllers/categoryController'
const catogoryRoutes = Router();

catogoryRoutes.post ('/', createCategory);

catogoryRoutes.post ('/:categoryId', createSubCategory);

catogoryRoutes.get ('/', getAllCategory);

export default catogoryRoutes;