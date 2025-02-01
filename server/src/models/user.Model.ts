import { model, Schema } from "mongoose";
import {IUser} from '../interfaces/users.interface'

const userSchema = new Schema<IUser>({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
});
const userModel = model<IUser>('User',userSchema);
export default userModel;