import {Request, Response, Router} from 'express';
import { registerUser,
    loginUser, 
    getUser,
    changePassword
 } from '../Controllers/userController';

const userRoutes = Router();

userRoutes.post ('/register', registerUser);

userRoutes.post ('/login', loginUser);

userRoutes.get ('/me', getUser);

userRoutes.post ('/change-password', changePassword);

export default userRoutes;