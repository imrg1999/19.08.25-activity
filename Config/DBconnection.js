import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async() => {
    try{
        const link = await mongoose.connect(process.env.mongoURIlink);
            console.log(`DB CONNECTED at ${link.connection.host}`);
    } catch(error) {
       console.error("DB connection Failed", error.message);
       process.exit(1);
        }
    }

