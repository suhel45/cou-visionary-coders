import { model} from 'mongoose';
import connectDB from '../db/database.connection';
import { personalInfoSchema } from './personalInfoModel';
import { PersonalInfo } from '../interfaces/PersonalInfo.interface';

connectDB();
const usersSchema = personalInfoSchema;
const userModel = model<PersonalInfo>('User', usersSchema);
export default userModel;
