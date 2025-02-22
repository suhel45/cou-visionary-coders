import { Schema, model } from 'mongoose';
import { ExpectedLifePartner } from '../interfaces/lifePartner.interface';

const ageSchema = new Schema({
  min: { type: Number, required: true },
  max: { type: Number, required: true },
});

const heightSchema = new Schema({
  min: { type: Number, required: true },
  max: { type: Number, required: true },
});

const expectedLifePartnerSchema = new Schema<ExpectedLifePartner>({
  age: { type: ageSchema, required: true },
  complexion: { type: String, required: true },
  height: { type: heightSchema, required: true },
  district: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  profession: { type: String, required: true },
  financialCondition: { type: String, required: true },
  expectedQualities: { type: String, required: true },
});

export const ExpectedLifePartnerModel = model<ExpectedLifePartner>('ExpectedLifePartner', expectedLifePartnerSchema);