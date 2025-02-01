import { model, Schema } from "mongoose";
import {IUser} from '../interfaces/users.interface'
import connectDB from "../db/database.connection";

connectDB();
const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true, lowercase: true },
    birthdate: { type: Date, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    complexion: { type: String, required: true},
    bloodGroup: { type: String, required: true, enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] },
    password: { type: String, required: true, minlength: 6 },
});
const userModel = model<IUser>('User',userSchema);
export default userModel;