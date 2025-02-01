import mongoose from "mongoose";
import dotenv from 'dotenv';
import path from "path";
dotenv.config({path:path.resolve('../../../.env')});

const connectDB = async()=>{
 try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("Mongodb Connect Sucessfully");
 } catch (error) {
    console.error("Mongodb connection failed",error);
    
 }
}
export default connectDB;