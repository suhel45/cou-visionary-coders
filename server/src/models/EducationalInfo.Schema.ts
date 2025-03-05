import { Schema } from 'mongoose';
import { EducationInfo } from '../interfaces/educationInfo.interface';

const academicRecordSchema = new Schema({
  passingYear: { type: Number, required: true },
  group: { type: String, required: true },
  gpa: { type: Number, required: true },
});
const universityRecordSchema = new Schema({
  faculty: { type: String, required: true },
  department: { type: String, required: true },
  session: { type: String, required: true },
});

export const educationInfoSchema = new Schema<EducationInfo>({
  ssc: { type: academicRecordSchema, required: true },
  hsc: { type: academicRecordSchema, required: true },
  university: {
    honours: { type: universityRecordSchema, required: true },
    masters: { type: universityRecordSchema },
  },
});
