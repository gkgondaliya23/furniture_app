import dotenv from 'dotenv';
import express from 'express';
// import cors from 'cors';
import { DBUtils } from './DBUtils/dbUtils';
import userRoutes from './Routes/userRoutes';
import productRoutes from './Routes/productRoutes';
import catogoryRoutes from './Routes/categoryRoutes';

dotenv.config({
    path: './.env'
})

const port = process.env.PORT || 9000;
const dbUrl = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB_NAME;

const app = express();

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', catogoryRoutes);

// server and DB connection
if(port && dbUrl && dbName){ 
    app.listen(port, ()=>{
        if(dbUrl && dbName){
            DBUtils.connectToDB(dbUrl, dbName).then((dbResponse)=>{
                console.log(dbResponse);
            });
    }
        console.log(`Server listening on ${port}`);
    })
}