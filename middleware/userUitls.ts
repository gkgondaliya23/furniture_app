import { Request, Response} from "express";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import UserCollection from "../Schemas/userSchema";

export const getUser = async (req: Request, res: Response) => {
    try {
        let isUser :any = req.headers['user'];

            isUser = await jwt.verify(isUser, process.env.JWT_SECRET as string);

            const userID = isUser.userID;
            if(!userID){
                return res.json({ message: 'Invalid user ID'});
            }
            const mongoID = new mongoose.Types.ObjectId(userID);
            let userObj = await UserCollection.findById(mongoID);
            if(!userObj){
                return res.json({ message: 'User not found' });
            }
            return userObj;
        
    } catch (error) {
        console.log(error);
        return res.json({ message:'not verified'});
    }

}