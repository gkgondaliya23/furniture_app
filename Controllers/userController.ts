import { Request, Response } from 'express';
import UserCollection from '../Schemas/userSchema';
import { IUser } from '../models/userModel';
import bcryptjs from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as UserUtils from '../middleware/userUitls';

/**
 * @usage : Register User 
 * @url : "https://localhost:7070/api/users/register"
 * @param : firstname, lastname, email, password, confirm_password, image, mobile
 * @method : POST
 * @access : PUBLIC 
 */

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, email, password, confirm_password, } = req.body;
        if (password === confirm_password) {
            const isUser = await UserCollection.findOne({ email: email });
            // console.log(isUser);

            if (isUser) {
                return res.json({ message: 'User already exists' });
            }

            // hash password
            const salt = await bcryptjs.genSalt(12);
            const hashPassword: String = await bcryptjs.hash(password, salt);

            let newUser: IUser = {
                firstname,
                lastname,
                email,
                password: hashPassword,
            };
            let user = await new UserCollection(newUser).save();
            res.status(201).json({ message: 'User created successfully' });

        } else {
            return res.json({ message: 'password and confirm_password is incorrect' });
        }
    } catch (error) {
        console.log(error);
        res.json({ message: 'Server error' });
    }
};


/**
 * @usage : Login User 
 * @url : "https://localhost:7070/api/users/login"
 * @param : email, password
 * @method : POST
 * @access : PUBLIC 
 */

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const userObj = await UserCollection.findOne({ email: email });
        // console.log(userObj?.password);
        if (!userObj) {
            return res.json({ message: 'User not found' });
        }

        const isMatch = await bcryptjs.compare(password, userObj.password as string);
        if (!isMatch) {
            return res.json({ message: 'Password is incorrect' });
        }

        const payload = {
            userID : userObj._id
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET as string);

        res.json({message : 'Login successful', token: token})

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};


/**
 * @usage : User Profile 
 * @url : "https://localhost:7070/api/users/me"
 * @param : no-param
 * @method : GET
 * @access : private 
 */

export const getUser = async (req: Request, res: Response) =>{
    try {
        const Getuser = await UserUtils.getUser(req, res);
        if(!Getuser){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(Getuser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * @usage : Change Password 
 * @url : "https://localhost:7070/api/users/change-password"
 * @method : POST
 * @access : private 
 */

export const changePassword = async (req: Request, res: Response) =>{
        try {
            const { password } = req.body;
            
            const salt = await bcryptjs.genSalt(12);
            const hashPassword: String = await bcryptjs.hash(password, salt);
            
            const isUser:any = await UserUtils.getUser(req, res);
            if(!isUser) 
                return res.status(404).json({message: "User not found"});
                
            isUser.password = hashPassword;
            await isUser.save();
            res.json({message: 'password updated successfully'});

        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Server error'});
        }
};