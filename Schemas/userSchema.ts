import mongoose from "mongoose";
import {IUser} from '../models/userModel';

const userSchmas  = new mongoose.Schema<IUser>({
    firstname : {
        type: String,
        required: true,
    },
    lastname : {
        type: String,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
    },
    image : {
        type: String,
        default: 'public/images/defualt.png',
    },
    mobile : {
        type: Number,
    },
},
{
    timestamps:true,
    versionKey:false,
}
);

userSchmas.virtual('user_id').get(function(){
    return this._id;
});

const UserCollection = mongoose.model<IUser>('user',userSchmas);
export default UserCollection;