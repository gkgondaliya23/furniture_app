import mongoose from "mongoose";

export class DBUtils{
    public static connectToDB(dbUrl:string, dbName:string) : Promise<string> {
        return new Promise<string>((resolve, reject) =>{
            mongoose.connect(dbUrl, {
                dbName:dbName
            })
            .then(() =>{
                resolve(`Database Connection established`);
            })
            .catch((error) =>{
                console.log(error);
                reject(`Database Connection failed`);
            })
        })
    }
};