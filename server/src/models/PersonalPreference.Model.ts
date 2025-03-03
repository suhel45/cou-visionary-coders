import { Schema } from 'mongoose';
import { PersonalPreference } from '../interfaces/personalPreferenc.interface';

export const personalPreferenceSchema = new Schema<PersonalPreference>({
  hobbies: { type: String, required: true },
  healthIssues: { type: String, required: true },
  religiousPractice: { type: String, required: true },
  readingHabit: { type: String, required: true },
  lifeStylePreference: { type: String, required: true },
  additionalInfo: { type: String, required: true },
});
