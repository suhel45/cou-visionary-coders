import { Schema } from 'mongoose';
import { ContactInfo } from '../interfaces/contactInfo.interface';

export const contactInfoSchema = new Schema<ContactInfo>({
  guardianInfo: { type: String, required: true },
  guardianContact: { type: String, required: true },
  candidateNumber: { type: String, required: true },
  candidateEmail: { type: String, required: true },
});
