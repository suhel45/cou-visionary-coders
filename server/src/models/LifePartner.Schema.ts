import { Schema } from 'mongoose';
import { ExpectedLifePartner } from '../interfaces/lifePartner.interface';



export const expectedLifePartnerSchema = new Schema<ExpectedLifePartner>({
  age: { type: String, required: true },
  complexion: { type: String, required: true },
  height: { type: String, required: true },
  district: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  profession: { type: String, required: true },
  financialCondition: { type: String, required: true },
  expectedQualities: { type: String, required: true },
});
