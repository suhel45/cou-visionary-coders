import { Schema } from 'mongoose';
import { PersonalInfoo } from '../interfaces/PersonalInfo.interface';

export const personalInfoSchema = new Schema<PersonalInfoo>({
  gender: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  birthDate: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  occupation: { type: String, required: true },
  complexion: { type: String, required: true },
  religion: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true,
  },
});
