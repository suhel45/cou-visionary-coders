import Types from 'mongoose';
import { EducationInfo } from './EducationInfo.interface';
import { FamilyInfo } from './familyInfo.interface';
import { ExpectedLifePartner } from './lifePartner.interface';
import { ContactInfo } from './contactInfo.interface';
import { PersonalInfoo } from './PersonalInfo.interface';
import { AddressInfo } from './address.interface';
import { PersonalPreference } from './personalPreference.interface';

export type IPersonalAllDetails = {
  biodataNo: number;
  users: Types.ObjectId;
  personalInfo: PersonalInfoo;
  address: AddressInfo;
  education: EducationInfo;
  familyInformation: FamilyInfo;
  expectedLifePartner: ExpectedLifePartner;
  contactInfo: ContactInfo;
  personalPreference: PersonalPreference;
};
